const { courseService, categoryService} = require('../services');
const extract = require('../utils/ExtractProperties');

const createCourse = async (req, res) => {
    // const { user } = req;
    // const { _id: instructorId } = user;
    const courseBody = req.body;
    try {
        const newCourse = await courseService.createCourse(courseBody);
        if (!newCourse) {
            return res.status(204).json({message: 'Cannot create course', error: ''});
        }
        return res.status(201).json({
            message: 'Successfully created a new course',
            data: newCourse
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
   
}

const getCourse = async (req, res) => {
    const courseId = req.params.id;
    const course = await courseService.getCourseById(courseId);
    if (!course) {
        return res.status(404).json({message: 'Course Not Found'});
    }
    res.status(200).json({ message: 'Found A Course', data: course});
}

const getCourses = async (req, res) => {
    // const categoryId  = req.query.catId || '';
    // //console.log(categoryId);
    // const courseTitle = req.query.title || '';
    // //console.log(courseTitle);
    // const sortBy = req.query.sortBy || '';
    // // const limit = req.query.limit || '';
    // // const page = req.query.page || '';
    const { type } = req.query;
    // console.log(type);
    // let filter = {};
    // let options = {
    //     limit: req.query.limit || 10,
    //     page: req.query.page || 1
    // }
    let filter, options, courses;
    switch (type) {
        case '1':
            // console.log('OK');
            // options = extract(req.query, ['limit', 'page']);
            // console.log(options);
            courses = await courseService.queryMostViewCourses();
            // console.log(courses);
            break; 
        case '2':
            // console.log('OK');
            // options = extract(req.query, ['limit', 'page']);
            // console.log(options);
            courses = await courseService.queryNewestCourses();
            console.log(courses);
            break;
        case '3':
            // console.log('OK');
            // options = extract(req.query, ['limit', 'page']);
            // console.log(options);
            courses = await courseService.queryBestSellerCourses();
            console.log(courses);
            break; 
        default:
            // console.log('OK');
            filter = extract(req.query, ['title', 'category', 'subCategory']);
            options = extract(req.query, ['sortBy', 'limit', 'page']);
            courses = await courseService.queryCoursesAdvancedFilter(filter, options);
            // console.log(courses);
            break;
            
    }
    // if (categoryId !== '') filter.category = categoryId;
    // if (courseTitle !== '') filter.$text = { $search: courseTitle };
    // //console.log(filter);
    // if (sortBy !== '') options.sort = {sortBy: 1};
    
    // const courses = await courseService.queryCourses(filter, options);
    // //console.log(courses);
    if (!courses || courses.length === 0) {
        return res.status(204);
    }
    return res.status(200).json(courses);
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
