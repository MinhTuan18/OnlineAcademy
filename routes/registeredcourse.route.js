const express = require('express');
const { registeredCourseController } = require('../controllers');
const { auth } = require('../middlewares/auth.mdw');
const router = express.Router();

router.post('/', auth, registeredCourseController.registerCourse);
router.get('/:id', auth, registeredCourseController.getRegisteredStudents);

module.exports = router;