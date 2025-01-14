const express = require("express");
const router = express.Router();

// Controllers
const frontViewController = require("../app/controllers/api/frontViewController");

// Request validators
// const {
//   validateCreateProfile
// } = require('../app/requests/userValidator.js');

// // Routes
router.get("/login", frontViewController.loginPage);

router.get("/home", frontViewController.home);

router.get("/listing", frontViewController.listingPage);

router.get("/detail", frontViewController.productDetailPage);

router.get("/createpost", frontViewController.createPostPage);
router.get("/post/:postId", frontViewController.createPostPage);
router.get("/favorites", frontViewController.favoritesPage);

module.exports = router;
