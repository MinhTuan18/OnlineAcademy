const httpStatus = require('http-status');
const { chapterService, courseService} = require('../services');

const createChapter = async (req, res) => {
  try {
    const chapter = req.body;
    if(!chapter || !chapter.video || !chapter.course || !chapter.name) {
      return res.status(httpStatus.BAD_REQUEST).json('Missing information');
    }
  } catch (error) {
    return res.status(error.statusCode || 500).json(error.message);
  }
}

module.exports = {
  createChapter
}