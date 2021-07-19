const express = require('express');
const { authController } = require('../controllers');
const { auth } = require('../middlewares/auth.mdw');

const router = express.Router();

router.post('/login', authController.login);

router.post('/register', authController.register);

router.post('/changePassword', auth, authController.changePassword);


module.exports = router;