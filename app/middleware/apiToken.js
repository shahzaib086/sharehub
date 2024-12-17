const fs = require('fs');
const status = require('../helpers/constants.js');
const ApiToken = require('../models/apiToken.js');
const User = require('../models/user.js'); 
const jwt = require("jsonwebtoken"); 

const privateKEY 	= fs.readFileSync('./keys/private.key','utf-8'); // to sign JWT
const publicKEY 	= fs.readFileSync('./keys/public.key', 'utf8'); 	// to verify JWT

const signOptions = {
	issuer: 	"SHAREHUB Authorizaxtion Bearer",	
	expiresIn: 	"365d",
	algorithm: 	"RS256" // RSASSA options[ "RS256", "RS384", "RS512" ]
};

/**
 * This middleware will verify api token is valid or not.
 */
const verifyApiToken = async (req, res, next) => {
    next();
    return;
    const api_token = req.headers['x-api-token'];
    const apiToken = new ApiToken();
    if (api_token) {
        const row = await apiToken.getCollection().where({token:api_token}).select("*");
        if (row.length !== 0) {
            req.api_token = api_token;
            next();
        } else {
            return res.status(status.HTTP_UNAUTHORIZED).json({
                status: status.FAILURE_STATUS,
                message: 'Unauthorized: Access Token',
            });
        }
    } else {
        return res.status(403).json({
            status: status.FAILURE_STATUS,
            message: 'Unauthorized: Access Token',
        });
    }
}

/**
 * This middleware will verify authenticated user in mobile application.
 */
// const verifyAuthToken = async (req, res, next) => {
//     const authHeader = req.headers['authorization'];

//     if (authHeader && authHeader.startsWith('Bearer ')) {
        
//         const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'
//         const user = jwt.verify(token, publicKEY, signOptions);

//         const userModel = new User();	
//         const get_user = await userModel.getById(user.id);  
//         if(get_user) {
            
//             //Setting auth for authenticate sessions
//             req.session.auth = get_user;

//             // Setting auth var for views global
//             // res.locals.auth = get_user;

//             return next();
//         }

//     }

//     return res.status(status.HTTP_FORBIDDEN).json({
//         status: status.FAILURE_STATUS,
//         message: 'Unauthorized: Access Token',
//     });

// }

/**
 * This middleware will verify authenticated user in mobile application in elastic db.
 */
const verifyAuthToken = async (req, res, next) => {
    return next();
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const user = jwt.verify(token, publicKEY, signOptions);
        const userModel = new User();	
        const get_user = await userModel.getById(user.id);  
        if(get_user) {
            //Setting auth for authenticate sessions
            req.session.auth = get_user;
            return next();
        }
    }

    return res.status(status.HTTP_FORBIDDEN).json({
        status: status.FAILURE_STATUS,
        message: 'Unauthorized: Access Token',
    });

}

/**
 * This middleware will log request response log in db.
 */
// const logRequestResponse = async (req, res, next) => {
//     const originalSend = res.send;

//     res.send = async function (responseBody) {

//         const logData = {
//             method: req.method,
//             status_code: res.statusCode,
//             request_header: JSON.stringify(req.headers),
//             request_body: JSON.stringify(req.body),
//             response_body: responseBody,
//             query_params: JSON.stringify(req.query),
//             endpoint: req.route?.path,
//             ip: req.connection.remoteAddress,
//             user_id: (req.user)?req.user.id:null
//         };
    
//         await db('request_logs').insert(logData);

//         // Call the original res.send function
//         originalSend.apply(res, arguments);
//     };
//     next();
// }

module.exports = {
	verifyApiToken,
    verifyAuthToken
    // logRequestResponse
};