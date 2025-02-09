//js
const status = require("../../helpers/constants.js");
const utils = require("../../helpers/utility.js");
// const User = require('../../models/user.js');
const Category = require("../../models/categoryES.js");
const Post = require("../../models/postES.js");
// const {sendOTPEmail} = require('../../helpers/email-module.js');
const UserFavorite = require("../../models/userFavoriteES.js");

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

const favoritesPage = async (req, res) => {
  const user = req.session.auth;
  if (user) {
    try {
      const userId = user.id;
      const userFavoriteModel = new UserFavorite();
      const favorites = await userFavoriteModel.getFavoriteItemsByUserId(userId);
      return res.render("favorites", { favorites });
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return res.render("favorites", { favorites: [], error: "Could not load favorites." });
    }
  } else {
    return res.redirect("/login");
  }
}
const createFavorite = async (req, res) => {
  const user = req.session.auth;
  if (user) {
    const categoryModel = new Category();
    const categories = await categoryModel.getAll();
    return res.render("add_favorite",{categories});
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
  favoritesPage, 
  createFavorite,
};
