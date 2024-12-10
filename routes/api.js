const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../app/controllers/api/userController");
const noticeBoardController = require("../app/controllers/api/noticeBoardController");

// Request validators
const { 
  validateCreateProfile 
} = require('../app/requests/userValidator.js');

const { 
  validateNoticeCreate,
  validateNoticeUpdate,
  validateNoticeDetails,
} = require('../app/requests/noticeBoardValidator.js');


// Routes
router.post(
  "/create-profile", 
  userController.uploadAvatar , 
  validateCreateProfile, 
  userController.createProfile
);

//Notice Board
router.post(
  "/notice/create", 
  noticeBoardController.uploadNoticeCover, 
  validateNoticeCreate, 
  noticeBoardController.createNotice
);
router.post(
  "/notice/update", 
  noticeBoardController.uploadNoticeCover, 
  validateNoticeUpdate, 
  noticeBoardController.updateNotice
);
router.post(
  "/notice/delete",
  validateNoticeDetails, 
  noticeBoardController.deleteNotice
);
router.post(
  "/notice/details",
  validateNoticeDetails, 
  noticeBoardController.noticeDetails
);
router.get(
  "/notice/list",
  noticeBoardController.getNoticeList
);



module.exports = router;