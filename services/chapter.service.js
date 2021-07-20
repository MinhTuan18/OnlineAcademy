const mongoose = require('mongoose');
const { Chapter } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const createChapter = async (chapter) => {
  return await Chapter.create(chapter);
}

module.exports = {
  createChapter
}