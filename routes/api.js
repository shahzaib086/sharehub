const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../app/controllers/api/userController");
const interestController = require("../app/controllers/api/interestController");
// const itemController = require("../app/controllers/api/itemController");


const { 
  validateCreatePost 
} = require('../app/requests/itemValidator.js');

const itemController = require("../app/controllers/api/itemController");


// // Routes
router.get(
  "/category/seed", 
  userController.seedCategories
);

router.get(
  "/category", 
  userController.getCategories
);

// Post Routes
router.post(
  "/post/create", 
  itemController.uploadItemImage,
  validateCreatePost,
  itemController.createItem
);

router.post(
  "/posts", 
  itemController.getPosts
);

//Interest Routes
router.post(
  "/favorite/create", 
  interestController.createFavorite
);

module.exports = router;