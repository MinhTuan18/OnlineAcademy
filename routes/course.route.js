const express = require('express');
const { courseController } = require('../controllers');
const router = express.Router();

router
  .route('/')
  .get(courseController.getCourses)
  .post(courseController.createCourse);

router
  .route('/:id')
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = router;