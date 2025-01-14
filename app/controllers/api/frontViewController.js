//js
const status = require("../../helpers/constants.js");
const utils = require("../../helpers/utility.js");
// const User = require('../../models/user.js');
const Category = require("../../models/categoryES.js");
const Post = require("../../models/postES.js");
// const {sendOTPEmail} = require('../../helpers/email-module.js');

const home = async (req, res) => {
  const user = req.session.auth;
  if (user) {
    return res.redirect("/listing");
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
    const categoryModel = new Category();
    const categories = await categoryModel.getAll();
    return res.render("listing", { categories });
  } else {
    return res.redirect("/home");
  }
};

const productDetailPage = async (req, res) => {
  const { postId } = req.query;
  const user = req.session.auth;
  if (user) {
    const postModel = new Post();
    const post = await postModel.getById(postId);
    return res.render("post-detail",{post});
  } else {
    return res.redirect("/home");
  }
};

module.exports = {
  loginPage,
  home,
  createPostPage,
  listingPage,
  productDetailPage,
};
