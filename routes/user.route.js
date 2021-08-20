const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();
const {auth} = require('../middlewares/auth.mdw')

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

module.exports = router;