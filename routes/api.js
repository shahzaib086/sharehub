const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../app/controllers/api/userController");
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

module.exports = router;