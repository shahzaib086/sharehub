//js
const status = require('../../helpers/constants.js');
const utils = require('../../helpers/utility.js'); 
// const User = require('../../models/user.js');
const ApiToken = require('../../models/apiToken.js');
const crypto = require('crypto');

//For Register Page
const getToken = async (req, res) => {
    let { device_id, platform, app_version, fcm_token } = req.body;
    if (!device_id || device_id == '' || !platform || platform == '') {
        res.json({
            status: status.FAILURE_STATUS,
            message: "Device ID and Platform fields are required.",            
        });
    }
    
    if (platform && platform!="ANDROID" && platform!="IOS" ) {
        res.json({
            status: status.FAILURE_STATUS,
            message: "Invalid platform value.",            
        });
    }
    
    try {

        const apiToken = new ApiToken();

        const row = await apiToken.getCollection().where({device_id,platform});
        let token = crypto.createHash('md5').update( utils.uuid4() ).digest("hex");
        platform = platform.toUpperCase();
        fcm_token = fcm_token??null;
        app_version = app_version??null;
        if (row.length !== 0) {
            let id = row[0].id;
            await apiToken.updateById(id,{ token, fcm_token, app_version });
        } else {
            await apiToken.getCollection().insert({ device_id, platform, token, fcm_token, app_version });
        }

        res.json({
            status: status.SUCCESS_STATUS,
            message: 'Success',						
            data : {
                token,
                device_id,
                platform,
                fcm_token,
                app_version
            }
        });
        
    } catch (error) {
        res.json({
            status: status.FAILURE_STATUS,
            message: error.message,						                
            data: {}
        });      
    }
}

module.exports =  {
    getToken,
};