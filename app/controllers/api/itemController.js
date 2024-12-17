//js
const status = require('../../helpers/constants.js');
const utils = require('../../helpers/utility.js'); 
// const User = require('../../models/user.js');
// const {sendOTPEmail} = require('../../helpers/email-module.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, './assets/items/');
    },    
    filename: function (req, file, cb) {
        const fileExtension = file.originalname.split('.').pop(); // Get the file extension
        const uniqueFileName = `${utils.uuid4()}.${fileExtension}`;
        cb(null, uniqueFileName);
    }
});

const uploadItemImage = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 10
    // },      
    }).fields(
    [
        {
            name:'image',
            maxCount: 1
        },			
    ]
);

const createItem = async (req, res) => {
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

module.exports =  {
    createItem,
    uploadItemImage
};