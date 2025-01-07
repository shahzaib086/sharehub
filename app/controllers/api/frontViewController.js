//js
const status = require('../../helpers/constants.js');
const utils = require('../../helpers/utility.js'); 
// const User = require('../../models/user.js');
const Category = require('../../models/categoryES.js');
// const {sendOTPEmail} = require('../../helpers/email-module.js');


const home = async (req, res) => {
    const user = req.session.auth;
    console.log("HOME PAGE user",user)
    if( user ){
        return res.render("home");
    } else {
        return res.render("home");
    }
}


const loginPage = async (req, res) => {
    const user = req.session.auth;
    console.log("LOGIN PAGE user",user)
    if( user ){
        return res.redirect('/home');
    } else {
        return res.render("login");
    }
}

const createPostPage = async (req, res) => {
    const user = req.session.auth;
    console.log("TEST USEr",user)
    if( user ){
        return res.render("create_post");
    } else {
        return res.redirect('/login');
    }
}


module.exports =  {
    loginPage,
    home,
    createPostPage
};