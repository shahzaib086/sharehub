const express = require("express");
const router = express.Router();

// Request validators
const { 
  validateCreateProfile 
} = require('../app/requests/userValidator.js');

// Controllers
const {
  createProfile,
  uploadAvatar
} = require("../app/controllers/api/userController");

// Routes
router.post("/create-profile", uploadAvatar , validateCreateProfile, createProfile);


module.exports = router;