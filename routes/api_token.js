const express = require("express");
const router = express.Router();

const {
  getToken,
} = require("../app/controllers/api/apiTokenController");

// Get Token
router.post("/get-token", getToken);

module.exports = router;