const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../app/controllers/api/userController");
// const itemController = require("../app/controllers/api/itemController");

// Request validators
// const { 
//   validateCreateProfile 
// } = require('../app/requests/userValidator.js');


// // Routes
router.get(
  "/category/seed", 
  userController.seedCategories
);

module.exports = router;