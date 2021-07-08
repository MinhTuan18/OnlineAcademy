const express = require('express');
const { adminController, userController } = require('../controllers');

const router = express.Router();

router.get('/getAllUsers', adminController.getAllUsers);

router.post('/addNewUser', adminController.addNewUser);

router.post('/blockUser', adminController.blockUser);

router.get('/getUserById/:id', adminController.getUserById);

module.exports = router;