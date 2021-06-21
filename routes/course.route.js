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

// router.get('/:id', courseController.getCourseById);

// router.post('/', courseController.addCourse);

// router.patch('/:id', courseController.updateCourse);

//router.get('/category/:id', courseController.getCourseByCategoryID);

//router.get('/search/:courseTitle', courseController.searchCourseByTitle);

// router.delete('/:id', courseController.deleteCourse);

// router.get('/category/:id', courseController.getCourseByCategoryID);

// router.get('/search/:courseTitle', courseController.searchCourseByTitle);
module.exports = router;