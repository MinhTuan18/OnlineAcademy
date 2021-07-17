const { courseService, categoryService} = require('../services');

const getCourse = async (req, res) => {
    const courseId = req.params.id;
    const course = await courseService.getCourseById(courseId);
    if (!course) {
        return res.status(404).json({message: 'Course Not Found'});
    }
    res.status(200).json({ message: 'Found A Course', data: course});
}

const getCourses = async (req, res) => {
    const categoryId  = req.query.catId || '';
    //console.log(categoryId);
    const courseTitle = req.query.title || '';
    //console.log(courseTitle);
    const sortBy = req.query.sortBy || '';
    // const limit = req.query.limit || '';
    // const page = req.query.page || '';
    let filter = {};
    let options = {
        limit: req.query.limit || 10,
        page: req.query.page || 1
    }
    if (categoryId !== '') filter.category = categoryId;
    if (courseTitle !== '') filter.$text = { $search: courseTitle };
    //console.log(filter);
    if (sortBy !== '') options.sort = {sortBy: 1};
    
    const courses = await courseService.queryCourses(filter, options);
    //console.log(courses);
    if (courses.docs.length === 0) {
        return res.status(204).json({ message: 'Course Not Found'});
    }
    return res.status(200).json(courses);
}

const createCourse = async (req, res) => {
    // const { user } = req;
    // const { _id: instructorId } = user;
    const courseBody = req.body;
    try {
        const newCourse = await courseService.createCourse(courseBody);
        if (!newCourse) {
            return res.status(204).json({message: 'Cannot create course', error: ''});
        }
        return res.status(201).json('Successfully created a new course');
    } catch (error) {
        return res.status(400).json(error.message);
    }
   
}

const updateCourse = async (req, res) => {
    const updatedCourse = await courseService.updateCourseById(req.params.id, req.body);
    if (!updatedCourse) {
        return res.status(404).json('Course not found');
    }
    res.status(200).json({
        message: 'Sucessfully updated course',
        data: updatedCourse
    })
}

const deleteCourse = async (req, res) => {
    const isCourseDeleted = await courseService.deleteCourseById(req.params.id);
    if (!isCourseDeleted) {
        return res.status(404).json('Course not found');
    }
    res.status(200).json({
        message: 'Sucessfully deleted course',
        data: isCourseDeleted
    })
}

module.exports = {
    getCourse,
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
}