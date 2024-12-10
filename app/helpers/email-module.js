'use strict'

const utils = require('../helpers/utility.js')
const config = require('../../config/app.js');
const brevo = require('@getbrevo/brevo');
require("dotenv").config();

// let defaultClient = brevo.ApiClient.instance;

// let apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = process.env.BREVO_SMTP_API_KEY;

// let apiInstance = new brevo.TransactionalEmailsApi();
// let sendSmtpEmail = new brevo.SendSmtpEmail();

const template_welcome = `<html>
    <head>
        <title></title>
        <style type="text/css">
            @media screen{@font-face{font-family:Lato;font-style:normal;font-weight:400;src:local("Lato Regular"),local("Lato-Regular"),url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format("woff")}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:local("Lato Bold"),local("Lato-Bold"),url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format("woff")}@font-face{font-family:Lato;font-style:italic;font-weight:400;src:local("Lato Italic"),local("Lato-Italic"),url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format("woff")}@font-face{font-family:Lato;font-style:italic;font-weight:700;src:local("Lato Bold Italic"),local("Lato-BoldItalic"),url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format("woff")}}a,body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0;mso-table-rspace:0}img{-ms-interpolation-mode:bicubic}img{border:0;height:auto;line-height:100%;outline:0;text-decoration:none}table{border-collapse:collapse!important}body{height:100%!important;margin:0!important;padding:0!important;width:100%!important}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}@media screen and (max-width:600px){h1{font-size:32px!important;line-height:32px!important}}div[style*="margin: 16px 0;"]{margin:0!important}
        </style>
    </head>
    <body style="background-color:#f4f4f4;margin:0!important;padding:0!important"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" style="padding:0 10px 0 10px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;border-top-right-radius:6px;border-top-left-radius:6px"><tr><td xbgcolor="#ffffff" xalign="center" valign="top" style="padding:40px 20px 20px 20px;border-radius:4px 4px 0 0;color:#111;font-family:Lato,Helvetica,Arial,sans-serif;font-size:48px;font-weight:400;letter-spacing:4px;line-height:48px;display:flex;justify-content:center;align-items:center"><img src="{{logo_url_one}}" alt="ShareHub"></td></tr></table></td></tr><tr><td bgcolor="#ffffff" align="center" style="padding:0 10px 0 10px"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:90%"><tr><td bgcolor="#ffffff" align="left" style="padding:20px 30px 20px 30px;color:#666;font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:25px"><p style="margin:0;font-size:14px">Hey User! 👋</p><p style="margin:0;margin-top:10px;font-size:14px">A warm and bubbly welcome to ShareHub! 🎉 We're thrilled to have you join our community of like-minded individuals looking for meaningful connections, fun experiences, and perhaps even the love of their life.<br><br>Here are a few tips to get started:<br><strong>Complete Your Profile:</strong><br>Show off those dazzling smiles! 😁 Add a cool profile picture, whip up a catchy bio, and let others in on your passions. A killer profile is the secret sauce to making your profile shine!<br><br><strong>Explore Matches:</strong><br>Get ready for the match magic! ✨ Our fancy algorithm curates potential matches based on your preferences. Swipe right if you're vibing, left if it's a no-go.<br><br><strong>Have Fun!</strong><br>Dating should be a blast! 🎉 Whether you're here for LOLs, new buddies, or something a bit more, soak in the experience and enjoy connecting with awesome peeps.<br><br>If you ever have questions or need assistance, our support team is here for you. Feel free to reach out to [support email/phone].<br><br>Once again, welcome to ShareHub. We hope your journey is filled with exciting connections and meaningful moments. 🚀<br><br>Happy dating! 💖<br><br>Best regards,<br>ShareHub Dating Team</p></td></tr><tr><td bgcolor="#ffffff" align="left" style="padding:20px;font-family:Helvetica,Arial,sans-serif;color:#666;font-size:14px"><hr style="margin-top:20px"><p style="margin:0;text-align:center;padding:10px;font-size:12px;padding-top:0">info@ShareHubdating.com</p><p style="margin:0;text-align:center;padding:10px;font-size:12px;padding-top:0">© 2023 All Rights Reserved</p><p style="margin:0;text-align:center;padding:10px;font-size:12px;padding-top:0"><a href="{{policy_url}}">Privacy Policy</a>&nbsp;&nbsp;<a href="{{terms_url}}">Terms & Conditions</a></p></td></tr></table></td></tr></table></body>
</html>`;

const template_otp = `<html>
    <head>
        <title></title>
        <style type="text/css">
            @media screen{@font-face{font-family:Lato;font-style:normal;font-weight:400;src:local("Lato Regular"),local("Lato-Regular"),url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format("woff")}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:local("Lato Bold"),local("Lato-Bold"),url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format("woff")}@font-face{font-family:Lato;font-style:italic;font-weight:400;src:local("Lato Italic"),local("Lato-Italic"),url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format("woff")}@font-face{font-family:Lato;font-style:italic;font-weight:700;src:local("Lato Bold Italic"),local("Lato-BoldItalic"),url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format("woff")}}a,body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0;mso-table-rspace:0}img{-ms-interpolation-mode:bicubic}img{border:0;height:auto;line-height:100%;outline:0;text-decoration:none}table{border-collapse:collapse!important}body{height:100%!important;margin:0!important;padding:0!important;width:100%!important}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}@media screen and (max-width:600px){h1{font-size:32px!important;line-height:32px!important}}div[style*="margin: 16px 0;"]{margin:0!important}
        </style>
    </head>
    <body style="background-color:#f4f4f4;margin:0!important;padding:0!important"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" style="padding:0 10px 0 10px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;border-top-right-radius:6px;border-top-left-radius:6px"><tr><td xbgcolor="#ffffff" xalign="center" valign="top" style="padding:40px 20px 20px 20px;border-radius:4px 4px 0 0;color:#111;font-family:Lato,Helvetica,Arial,sans-serif;font-size:48px;font-weight:400;letter-spacing:4px;line-height:48px;display:flex;justify-content:center;align-items:center"><img src="{{logo_url_one}}" alt="ShareHub"></td></tr></table></td></tr><tr><td bgcolor="#ffffff" align="center" style="padding:0 10px 0 10px"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:90%"><tr><td bgcolor="#ffffff" align="left" style="padding:20px 30px 20px 30px;color:#666;font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:25px;text-align:left"><p style="margin:0;font-size:14px">Dear User,</p><p style="margin:0;margin-top:10px;font-size:14px">Welcome to ShareHub! 🎉 We’re excited to have you on board. To complete your account setup, please use the verification code below:<br><strong>{{code}}</strong><br><br>Please enter this code in the verification in the app to activate your account. If you didn’t sign up for ShareHub, you can ignore this email.<br><br>Thank you for choosing ShareHub!<br>For any assistance or questions, our support team is here to help. Contact us at info@ShareHubdating.com<br><br>Best regards,<br>ShareHub Dating Team</p></td></tr><tr><td bgcolor="#ffffff" align="left" style="padding:20px;font-family:Helvetica,Arial,sans-serif;color:#666;font-size:14px"><hr style="margin-top:20px"><p style="margin:0;text-align:center;padding:10px;font-size:12px;padding-top:0">info@ShareHubdating.com</p><p style="margin:0;text-align:center;padding:10px;font-size:12px;padding-top:0">© 2023 All Rights Reserved</p><p style="margin:0;text-align:center;padding:10px;font-size:12px;padding-top:0"><a href="{{policy_url}}">Privacy Policy</a>&nbsp;&nbsp;<a href="{{terms_url}}">Terms & Conditions</a></p></td></tr></table></td></tr></table></body>
</html>`;

const template_forgot_password = `<html>
    <head>
        <title></title>
        <style type="text/css">
            @media screen{@font-face{font-family:Lato;font-style:normal;font-weight:400;src:local("Lato Regular"),local("Lato-Regular"),url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format("woff")}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:local("Lato Bold"),local("Lato-Bold"),url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format("woff")}@font-face{font-family:Lato;font-style:italic;font-weight:400;src:local("Lato Italic"),local("Lato-Italic"),url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format("woff")}@font-face{font-family:Lato;font-style:italic;font-weight:700;src:local("Lato Bold Italic"),local("Lato-BoldItalic"),url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format("woff")}}a,body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0;mso-table-rspace:0}img{-ms-interpolation-mode:bicubic}img{border:0;height:auto;line-height:100%;outline:0;text-decoration:none}table{border-collapse:collapse!important}body{height:100%!important;margin:0!important;padding:0!important;width:100%!important}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}@media screen and (max-width:600px){h1{font-size:32px!important;line-height:32px!important}}div[style*="margin: 16px 0;"]{margin:0!important}
        </style>
    </head>
    <body style="background-color:#f4f4f4;margin:0!important;padding:0!important"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" style="padding:0 10px 0 10px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;border-top-right-radius:6px;border-top-left-radius:6px"><tr><td xbgcolor="#ffffff" xalign="center" valign="top" style="padding:40px 20px 20px 20px;border-radius:4px 4px 0 0;color:#111;font-family:Lato,Helvetica,Arial,sans-serif;font-size:48px;font-weight:400;letter-spacing:4px;line-height:48px;display:flex;justify-content:center;align-items:center"><img src="{{logo_url_one}}" alt="ShareHub"></td></tr></table></td></tr><tr><td bgcolor="#ffffff" align="center" style="padding:0 10px 0 10px"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:90%"><tr><td bgcolor="#ffffff" align="left" style="padding:20px 30px 20px 30px;color:#666;font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:25px;text-align:left"><p style="margin:0;font-size:14px">Dear User,</p><p style="margin:0;margin-top:10px;font-size:14px">We’ve received your request to reset your password.<br>Please use the code below.<br><strong>{{code}}</strong><br><br>If you didn’t request this, you can ignore this email.<br><br>For any assistance or questions, our support team is here to help. Contact us at info@ShareHubdating.com<br><br>Best regards,<br>ShareHub Dating Team</p></td></tr><tr><td bgcolor="#ffffff" align="left" style="padding:20px;font-family:Helvetica,Arial,sans-serif;color:#666;font-size:14px"><hr style="margin-top:20px"><p style="margin:0;text-align:center;padding:10px;font-size:12px;padding-top:0">info@ShareHubdating.com</p><p style="margin:0;text-align:center;padding:10px;font-size:12px;padding-top:0">© 2023 All Rights Reserved</p><p style="margin:0;text-align:center;padding:10px;font-size:12px;padding-top:0"><a href="{{policy_url}}">Privacy Policy</a>&nbsp;&nbsp;<a href="{{terms_url}}">Terms & Conditions</a></p></td></tr></table></td></tr></table></body>
</html>`;


const sendEmail = async (sendSmtpEmail) => {
    try {
        let result = await apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
            
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
            return data
        }, function (error) {
            console.error('server error' + error);
        });        
        return result;
    } catch (err) {
        console.log('{{error}} ' + err);
    }
};

const emailProcessor = (email, subject, body) => {
    // TODO: Disable untill service integration
    // sendSmtpEmail.subject = subject;
    // sendSmtpEmail.htmlContent = utils.getEmailTemplate(body);
    // sendSmtpEmail.sender = { "name": process.env.BREVO_SMTP_FROM_NAME, "email": process.env.BREVO_SMTP_FROM_EMAIL };
    // sendSmtpEmail.to = [
    //     { "email": email }
    // ];    
    // return sendEmail(sendSmtpEmail);
};

const sendWelcomeEmail = async (email) => {
    let subject = '🌟 Welcome to ShareHub - Let the Adventure Begin! 🌈';
    let template = template_welcome;
    let params = {
        'logo_url_one' : config.app_base_url+'/admin/assets/img/logo/logo_email_small.png',
        'logo_url_two' : config.app_base_url+'/admin/assets/img/logo/mShareHub_small.png',
        'terms_url' : '#',
        'policy_url' : '#',
    }
    for (const [key, value] of Object.entries(params)) {
        template = template.replace('{{' + key + '}}', value);
    }
    return await emailProcessor(email, subject, template);
}

const sendOTPEmail = async (email,otp_code) => {
    let subject = 'ShareHub - Verify your email address';
    let template = template_otp;
    let params = {
        'logo_url_one' : config.app_base_url+'/admin/assets/img/logo/logo_email_small.png',
        'logo_url_two' : config.app_base_url+'/admin/assets/img/logo/mShareHub_small.png',
        'code' : otp_code,
        'terms_url' : '#',
        'policy_url' : '#',
    }
    for (const [key, value] of Object.entries(params)) {
        template = template.replace('{{' + key + '}}', value);
    }
    return await emailProcessor(email, subject, template);
}

const sendForgotPasswordEmail = async (email,otp_code) => {
    let subject = 'ShareHub - OTP to reset your password';
    let template = template_forgot_password;
    let params = {
        'logo_url_one' : config.app_base_url+'/admin/assets/img/logo/logo_email_small.png',
        'logo_url_two' : config.app_base_url+'/admin/assets/img/logo/mShareHub_small.png',
        'code' : otp_code,
        'terms_url' : '#',
        'policy_url' : '#',
    }
    for (const [key, value] of Object.entries(params)) {
        template = template.replace('{{' + key + '}}', value);
    }
    return await emailProcessor(email, subject, template);
}

module.exports = {emailProcessor, sendOTPEmail, sendWelcomeEmail, sendAccountApprovedEmail, sendAccountRejectionEmail, sendForgotPasswordEmail};
