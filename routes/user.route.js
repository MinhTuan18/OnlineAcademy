const express = require('express');
const { userController } = require('../controllers');
const { auth, instructorAuth } = require('../middlewares/auth.mdw');
const router = express.Router();

router.post('/activate', userController.activatedAccount);
// router
//   .route('/')
//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(courseController.getCourse)
//   .patch(courseController.updateCourse)
//   .delete(courseController.deleteCourse);

router.post('/resendOTP', userController.resendOTP);
router.post('/:userId/update-watchlist', auth, userController.updateWatchlist);
router.post('/:userId/buy-course', auth, userController.buyCourse);
router.get('/:userId', auth, userController.getInfo)
router.post('/:userId/update-profile', auth, userController.updateProfile)
router.get('/:userId/created-courses', instructorAuth, userController.getCreatedCourses);

module.exports = router;
