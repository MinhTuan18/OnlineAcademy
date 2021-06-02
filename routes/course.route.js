const express = require('express');
const courseController = require('../controllers/course.controller');
const router = express.Router();

router.get('/category/:id', courseController.getCourseByCategoryID);

module.exports = router;