const express = require('express');
const {getHomePage} = require('../controller/homeController');
const router = express.Router();

// router.Method('/route', handle);

router.get('/test', getHomePage);

module.exports = router;
