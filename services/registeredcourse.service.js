const mongoose = require('mongoose');
const { RegisteredCourse, Course, User } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const registerCourse = async (userId, courseId) => {
  const result = RegisteredCourse.create({user: userId, course: courseId});
  return result;
}

const getRegisteredStudents = async (courseId) => {
  const course = await Course.findOne({ _id: courseId });
  if (!course) {
    throw new ApiError('Course is not exist', httpStatus.BAD_REQUEST);
  }
  let registeredStudents = await RegisteredCourse.find({ course: courseId}).populate({ path: 'user', select: 'name email'});

  return registeredStudents;
}
module.exports = {
  registerCourse,
  getRegisteredStudents
}