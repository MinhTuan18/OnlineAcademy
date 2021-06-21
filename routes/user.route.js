const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();

router
  .route('/')
  .post(userController.createUser);

// router
//   .route('/:id')
//   .get(courseController.getCourse)
//   .patch(courseController.updateCourse)
//   .delete(courseController.deleteCourse);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.addNewUser);

router.put('/:id', userController.updateProfile);

router.post('/block-user', userController.blockUser);
module.exports = router;