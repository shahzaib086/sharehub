//js
const status = require('../../helpers/constants.js');
const utils = require('../../helpers/utility.js'); 
const User = require('../../models/user.js');
const ApiToken = require('../../models/apiToken.js');
// const crypto = require('crypto');
const authToken = require('../../helpers/jwt-module.js')
const {sendOTPEmail} = require('../../helpers/email-module.js');


const login = async (req, res) => {
    let { login_type, email, country_code, phone_number, app_mode } = req.body;

    if (!app_mode || app_mode == '') {
        res.json({
            status: status.FAILURE_STATUS,
            message: "App mode is required.",            
        });
    }

    if( login_type == 'email' ){
        if (!email || email == '') {
            res.json({
                status: status.FAILURE_STATUS,
                message: "Email is required.",            
            });
        }
    } else {
        if (!country_code || country_code == '' || !phone_number || phone_number == '') {
            res.json({
                status: status.FAILURE_STATUS,
                message: "Phone number is required.",            
            });
        }
    }
    
    try {

        const apiTokenModel = new ApiToken();
        const userModel = new User();
        let user = null;
        if( login_type == 'email' ){
            user = await userModel.getCollection().where({ email: email }).first("*");
        } else {
            user = await userModel.getCollection().where({ phone_number: phone_number }).first("*");
        }

        //Getting x-api-token from header and update fcm token to user
        let api_token = req.api_token;
        let apiTokenResult = await apiTokenModel.getCollection().where({token:api_token}).first();

        if(user) {
            
            let id = user.id;  

            //TODO: Temporary disable otp generation
            // let otp_code = utils.generateOTP();
            let otp_code = "1122";
            let otp_created_at = utils.getFormatedDate()
            
            //TODO: temporary disable email sent service
            // const result = await sendOTPEmail(email, otp_code);

            const updateData = {
                email,
                fcm_token: apiTokenResult?.fcm_token ?? undefined,
                status: status.USER_STATUS_ACTIVE,
                role_id: (app_mode==status.APP_MODE_PLAYER)? status.ROLE_PLAYER : status.ROLE_FAN,
                otp_code,
                otp_created_at
            }

            await userModel.updateById(id, updateData);

        } else {

            let signup_step = status.SIGNUP_STEP_ACCOUNT;

            //TODO: Temporary disable otp generation
            // let otp_code = utils.generateOTP();
            let otp_code = "1122";
            let otp_created_at = utils.getFormatedDate()
            
            //TODO: temporary disable email sent service
            // const result = await sendOTPEmail(email, otp_code);

            const insertData = {
                email,
                password: "",
                signup_step, 
                fcm_token: apiTokenResult?.fcm_token,
                status: status.USER_STATUS_ACTIVE,
                role_id: (app_mode==status.APP_MODE_PLAYER)? status.ROLE_PLAYER : status.ROLE_FAN,
                otp_code,
                otp_created_at
            }

            user = await userModel.getCollection().returning('id').insert(insertData);

        }

        res.json({
            status: status.SUCCESS_STATUS,
            message: 'User account created successfully!',
            data: {
                user_id: user.id
            }
        });  

    } catch (error) {
        return res.json({
            status: status.FAILURE_STATUS,
            message: error.message,						                
            data: {}
        });      
    }
}

const verifyOTP = async(req, res) => {
    let { otp_code, user_id } = req.body;
    if (!otp_code || otp_code == '' || !user_id || user_id == '') {
        return res.status(status.HTTP_BAD_REQUEST).json({
            status: status.FAILURE_STATUS,
            message: "Bad Request",            
            data: {}
        });
    }   
    
    try {

        const userModel = new User();
        const user = await userModel.getById(user_id);            
        
        if(user && user.otp_code == otp_code) {

            let id = user.id;
            let otp_code = null;
            
            const users = await userModel.updateById(id,{ otp_code });
            if (users.length !== 0) {

                let d = user;
                let email = user.email;
                let auth_token = authToken.generate({
                    id: id, 
                    email
                })            
                d.access_token = auth_token
                d.password = undefined;

                res.json({
                    status: status.SUCCESS_STATUS,
                    message: 'Logged in successfully!',						                                    
                    data: {
                        user: d,
                        redirect_screen: (user.signup_step==status.SIGNUP_STEP_ACCOUNT) ? 'complete_profile' : 'home',
                        signup_step: user.signup_step
                    }
                });
                        
            } else {
                res.json({
                    status: status.FAILURE_STATUS,
                    message: 'Failed to verify otp!',						
                    data: {}
                });
            }

        } else {

            res.json({
                status: status.FAILURE_STATUS,
                message: 'Invalid OTP',						                    
                data: {}
            });
        }                                         

    } catch (error) {
        return res.status(status.HTTP_SERVER_ERROR).json({
            status: status.FAILURE_STATUS,
            message: error.message,						                
            data: {}
        });      
    }
}

const resendOTP = async(req, res) => {
    let { user_id } = req.body;
    if (!user_id || user_id == '') {
        return res.status(status.HTTP_BAD_REQUEST).json({
            status: status.FAILURE_STATUS,
            message: "Bad Request",            
            data: {}
        });
    }   
    
    try {

        const userModel = new User();
        const user = await userModel.getById(user_id);            
        
        if(user) {

            let id = user.id;
            //TODO: Temporary disable otp generation
            // let otp_code = utils.generateOTP();
            let otp_code = "1122";
            let otp_created_at = utils.getFormatedDate()
            
            //TODO: temporary disable email sent service
            // const result = await sendOTPEmail(email, otp_code);
            
            const users = await userModel.getCollection().where({ id })
            .update({ otp_code, otp_created_at }, ["id"]);
            if (users.length !== 0) {

                return res.json({
                    status: status.SUCCESS_STATUS,
                    message: 'OTP has been sent to your email.',						                                    
                    data: {
                        user_id: id
                    }
                });
                        
            } else {
                return res.json({
                    status: status.FAILURE_STATUS,
                    message: 'Failed to verify otp!',						
                    data: {}
                });
            }

        } else {
            return res.status(status.HTTP_NOT_FOUND).json({
                status: status.FAILURE_STATUS,
                message: 'User does not exist.',						                    
                data: {}
            });
        }                                         

    } catch (error) {
        return res.status(status.HTTP_SERVER_ERROR).json({
            status: status.FAILURE_STATUS,
            message: error.message,						                
            data: {}
        });      
    }
}

module.exports =  {
    login,
    verifyOTP,
    resendOTP,
};