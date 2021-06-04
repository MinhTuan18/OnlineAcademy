const courseModel = require('../models/course.model');

// module.exports = {
//   getCourseByCategoryID: function (req, res) {
    
//   },

// }

exports.getCourseByCategoryID = (req, res) => {
    const categoryID  = req.params.id;
    if (!categoryID) {
      return res.status(400).json("Category ID is required");
    }
    console.log(categoryID);
    const listCourse = courseModel.getCourseByCategoryID(categoryID);
    console.log(listCourse);
    res.status(200).json(listCourse);
}

exports.getAllCourses = async (req, res) => {
    const courses = await courseModel.all();
    //console.log(courses);
    res.json(courses);
}

exports.getCourseById = async (req, res) => {
    const course = await courseModel.single(req.params.id);
    //console.log(courses);
    res.json(course);
}

exports.addCourse = async (req, res) => {
    const newCourse = await courseModel.add(req.body);
    res.status(201).json({
        message: 'Sucessfully created a new course',
        data: newCourse
    })
}

exports.updateCourse = async (req, res) => {
    await courseModel.update(req.params.id, req.body);
    res.status(200).json({
        message: 'Sucessfully updated a new course',
    })
}

exports.deleteCourse = async (req, res) => {
    await courseModel.delete(req.params.id);
    res.status(200).json({
        message: 'Sucessfully deleted a new course',
    })
}