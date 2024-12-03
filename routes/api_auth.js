const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  verifyOTP,
  resendOTP
} = require("../app/controllers/api/authController");

// Get Token
router.post("/login", login);
// router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);

module.exports = router;