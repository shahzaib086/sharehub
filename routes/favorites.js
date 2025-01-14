const express = require('express');
const router = express.Router();
const {getFavorites} = require('../app/controllers/api/userFavoriteController');

router.get('/:userId', getFavorites);

module.exports = router;