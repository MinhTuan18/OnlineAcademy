const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.addNewUser);

router.put('/:id', userController.updateProfile);

router.post('/block-user', userController.blockUser);
module.exports = router;