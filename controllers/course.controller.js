const courseModel = require('../models/course.model');

module.exports = {
  getCourseByCategoryID: function (req, res) {
    const categoryID  = req.params.id;
    if (!categoryID) {
      return res.status(400).json("Category ID is required");
    }
    console.log(categoryID);
    const listCourse = courseModel.getCourseByCategoryID(categoryID);
    console.log(listCourse);
    res.status(200).json(listCourse);

  }
}