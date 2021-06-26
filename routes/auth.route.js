const express = require('express');
const { authController, userController } = require('../controllers');

const router = express.Router();

router.post('/login', authController.login);

router.post('/signup', userController.createUser);

module.exports = router;