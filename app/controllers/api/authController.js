//js
const status = require('../../helpers/constants.js');
const utils = require('../../helpers/utility.js'); 
const User = require('../../models/userES.js');
const dayjs = require('dayjs'); 
const authToken = require('../../helpers/jwt-module.js')
// const {sendOTPEmail} = require('../../helpers/email-module.js');

const signup = async (req, res) => {
    let { name, email, password, lat, lng } = req.body;

    try {
        const userModel = new User();

        let checkEmail = await userModel.checkEmailExist(email);
        if( checkEmail ){
            return res.json({
                status: status.FAILURE_STATUS,
                message: "Email is already exist",            
                data: {}
            });
        }

        utils.cryptPassword(password, async(hashPassword) => {                      
            if(hashPassword) {

                let signup_step = status.SIGNUP_STEP_ACCOUNT;

                //TODO: Temporary disable otp generation
                // let otp_code = utils.generateOTP();
                let otp_code = "1122";
                let otp_created_at = utils.getFormatedDate()
                
                const insertData = {
                    name, 
                    email, 
                    password: hashPassword, 
                    lat,
                    lng,
                    role_id: status.ROLE_USER,
                    otp_code,
                    otp_created_at,
                    status: status.USER_STATUS_ACTIVE,
                    signup_step,
                    is_email_verified: 0,
                    email_verified_at: null,
                    profile_image: '',
                    joined_at: dayjs()
                }

                const userId = await userModel.create(insertData);
                if (userId) {

                    return res.json({
                        status: status.SUCCESS_STATUS,
                        message: 'Account created successfully! Please verify your email address to continue.',						
                        data: {
                            // auth_token: auth_token,
                            user_id: userId
                        }
                    });
                            
                } else {
                    return res.json({
                        status: status.FAILURE_STATUS,
                        message: 'Failed to create account!',						
                        data: {}
                    });
                }                        
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

const login = async (req, res) => {
    let { email, password } = req.body;

    if((!email || email == '')){
        return res.json({
            status: status.FAILURE_STATUS,
            message: "Email is required.",            
        });
    } else if ((!password || password == '')) {
        return res.json({
            status: status.FAILURE_STATUS,
            message: "Password is required.",            
        });
    }
    
    try {

        const userModel = new User();
        let user = await userModel.getByEmail(email);

        if(user) {
            
            let id = user.id;  
            utils.comparePassword(password, user.password, async (isPasswordMatch) => {                        
                if(isPasswordMatch) {
                    let d = user;
                    let auth_token = authToken.generate({
                        id: id, 
                        email, 
                        password
                    })            
                    d.access_token = auth_token
                    d.password = undefined;

                    res.json({
                        status: status.SUCCESS_STATUS,
                        message: 'User LoggedIn Successfully!',
                        data: d
                    });                                
                    
                } else {
                    res.json({
                        status: status.FAILURE_STATUS,
                        message: 'Incorrect Email/Password',	
                        data : {}
                    });
                }
            });                             
            
        } else {
            res.json({
                status: status.FAILURE_STATUS,
                message: 'Incorrect Email/Password',		
                data: {}
            });
        } 

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
            let updateData = {
                otp_code: null, 
                email_verified_at: dayjs()
            }
            const users = await userModel.updateById(id, updateData);
            if (users.length !== 0) {
                let d = user;
                let email = user.email;
                let auth_token = authToken.generate({
                    id: id, 
                    email,
                    password: user.password
                })            
                d.access_token = auth_token
                d.password = undefined;

                return res.json({
                    status: status.SUCCESS_STATUS,
                    message: 'Logged in successfully!',						                                    
                    data: {
                        user: d,
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

            return res.json({
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
    signup,
    login,
    verifyOTP,
    resendOTP,
};