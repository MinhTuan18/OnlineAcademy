const express = require('express');
const courseController = require('../controllers/course.controller');
const router = express.Router();

router.get('/', courseController.getAllCourses);

router.get('/:id', courseController.getCourseById);

router.post('/', courseController.addCourse);

router.patch('/:id', courseController.updateCourse);

router.delete('/:id', courseController.deleteCourse);

//router.get('/category/:id', courseController.getCourseByCategoryID);

//router.get('/search/:courseTitle', courseController.searchCourseByTitle);

module.exports = router;