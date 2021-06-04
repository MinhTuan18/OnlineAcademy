const courseModel = require('../models/course.model');

module.exports = {
  getCourseByCategoryID: async function (req, res) {
    const categoryID  = req.params.id;
    if (!categoryID) {
      return res.status(400).json("Category ID is required");
    }
    try {
      const listCourse = await courseModel.getCourseByCategoryID(categoryID);
      if (!listCourse || !listCourse.length) {
        return res.status(204).json();
      }
      res.status(200).json(listCourse);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  searchCourseByTitle: async function (req, res) {
    const query = req.params.courseTitle;
    if (!query || !query.trim()) {
      return res.status(400).json("No query string");
    }
    try {
      const listCourse = await courseModel.searchCourseByTitle(query);
      if (!listCourse || !listCourse.length) {
        return res.status(204).json();
      }
      res.status(200).json(listCourse);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}