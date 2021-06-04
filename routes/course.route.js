const express = require('express');
const courseController = require('../controllers/course.controller');
const router = express.Router();

router.get('/category/:id', courseController.getCourseByCategoryID);
router.get('/search/:courseTitle', courseController.searchCourseByTitle);
module.exports = router;