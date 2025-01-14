const express = require('express');
const router = express.Router();
const {getFavorites} = require('../app/controllers/api/userFavoriteController');

router.get('/', getFavorites);

module.exports = router;