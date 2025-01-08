//js
const status = require("../../helpers/constants.js");
const utils = require("../../helpers/utility.js");
// const User = require('../../models/user.js');
const Category = require("../../models/categoryES.js");
// const {sendOTPEmail} = require('../../helpers/email-module.js');

const home = async (req, res) => {
  const user = req.session.auth;
  if (user) {
    return res.render("home");
  } else {
    return res.render("home");
  }
};

const loginPage = async (req, res) => {
  const user = req.session.auth;
  if (user) {
    return res.redirect("/home");
  } else {
    return res.render("login");
  }
};

const createPostPage = async (req, res) => {
  const user = req.session.auth;
  if (user) {
    const categoryModel = new Category();
    const categories = await categoryModel.getAll();
    return res.render("create_post", { categories });
  } else {
    return res.redirect("/login");
  }
};

const listingPage = async (req, res) => {
  const user = req.session.auth;
  if (user) {
    return res.redirect("/listing");
  } else {
    return res.render("listing");
  }
};

const productDetailPage = async (req, res) => {
  const user = req.session.auth;
  if (user) {
    return res.render("post-detail");
  } else {
    return res.render("post-detail");
  }
};

module.exports = {
  loginPage,
  home,
  createPostPage,
  listingPage,
  productDetailPage,
};
