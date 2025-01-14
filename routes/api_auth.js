const express = require("express");
const router = express.Router();

const { 
  validateSignup 
} = require('../app/requests/userValidator.js');

const authController = require("../app/controllers/api/authController");

// Get Token
router.post("/signup", validateSignup, authController.signup);
router.post("/login", authController.login);
router.post("/verify-otp", authController.verifyOTP);
router.post("/resend-otp", authController.resendOTP);
router.post("/logout", authController.logout);

module.exports = router;