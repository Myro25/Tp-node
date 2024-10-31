const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');


router.get(' /profile', auth, UserController.getProfile)

module.exports = router;