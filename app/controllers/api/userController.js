//js
const status = require('../../helpers/constants.js');
const utils = require('../../helpers/utility.js'); 
const User = require('../../models/user.js');
const {sendOTPEmail} = require('../../helpers/email-module.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, './assets/profile/');
    },    
    filename: function (req, file, cb) {
        const fileExtension = file.originalname.split('.').pop(); // Get the file extension
        const uniqueFileName = `${utils.uuid4()}.${fileExtension}`;
        cb(null, uniqueFileName);
    }
});

const uploadAvatar = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 10
    // },      
    }).fields(
    [
        {
            name:'profile_image',
            maxCount: 1
        },			
    ]
);

const createProfile = async (req, res) => {
    let { 
        first_name, 
        last_name, 
        email,
        country_code,
        phone_number,
        position,
        hand_foot,
        age,
        gender,
    } = req.body;
    let { profile_image } = req.files;

    try {
        const userModel = new User();
        let user = req.session.auth;
        let checkEmail = await userModel.checkEmailExist(email,user);
        if( checkEmail ){
            return res.status(status.HTTP_BAD_REQUEST).json({
                status: status.FAILURE_STATUS,
                message: 'Email is already exist',
                data: {},
            });
        }

        let image = profile_image ? '/assets/profile/' + profile_image[0].filename : undefined;
        const updateData = {
            first_name, 
            last_name, 
            email,
            country_code,
            phone_number,
            position,
            hand_foot,
            age,
            gender,
            profile_image: image,
            signup_step: status.SIGNUP_STEP_PROFILE_UPDATED
        };  

        await userModel.updateById(user.id, updateData);
        const updatedUser = await userModel.getById(user.id);

        return res.status(status.HTTP_SUCCESS).json({
            status: status.SUCCESS_STATUS,
            message: 'Profile created sucessfully',						                
            data: {
                user: updatedUser
            }
        }); 

    } catch (error) {
        return res.status(status.HTTP_SERVER_ERROR).json({
            status: status.FAILURE_STATUS,
            message: error.message,						                
            data: {}
        });      
    }
}

module.exports =  {
    createProfile,
    uploadAvatar
};