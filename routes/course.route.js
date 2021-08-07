const express = require('express');
const { courseController } = require('../controllers');
const { auth } = require('../middlewares/auth.mdw');
const router = express.Router();


router
  .route('/')
  .get(courseController.getCourses)
  .post(auth, courseController.createCourse);

router
  .route('/:id')
  .get(courseController.getCourse)
  .patch(auth, courseController.updateCourse)
  .delete(auth, courseController.deleteCourse);

router.get('/getCourses/query', courseController.getCourseList);
module.exports = router;