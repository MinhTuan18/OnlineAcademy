const mongoose = require('mongoose');
const { Course } = require('../models');

/**
 * Query for all courses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
**/
const queryCourses = async (filter, options) => {
    const { category } = filter;
    if (category) {
        filter.category = mongoose.Types.ObjectId(category);
    }
    const courses = await Course.paginate(filter, options);
    return courses;
};

/**
 * get course by id
 * @param {ObjectId} courseId
 * @returns {Promise<Course>}
**/
const getCourseById = async (courseId) => {
    return Course.findById(mongoose.Types.ObjectId(courseId));
};

/**
 * Create a course
 * @param {Object} courseInfo
 * @returns {Promise<Course>}
**/
const createCourse = async (courseInfo) => {
    return await Course.create(courseInfo);
};

/**
 * Update course by id
 * @param {ObjectId} courseId
 * @param {Object} updateBody
 * @returns {Promise<Course>}
**/
const updateCourseById = async (courseId, updateBody) => {
    const options = {
        new: true,
        omitUndefined: true
    }
    return await Course.findByIdAndUpdate(mongoose.Types.ObjectId(courseId), updateBody, options);
};

/**
 * Delete course by id
 * @param {ObjectId} courseId
 * @returns {Promise<Course>}
**/
const deleteCourseById = async (courseId) => {
    return await Course.findByIdAndDelete(mongoose.Types.ObjectId(courseId));
};

/**
 * Query for courses of one category
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResults>}
**/
const queryCoursesByCategoryId = async (filter, options) => {
    //console.log(filter);
    if (!filter) filter = {};
    if (!options) options = {
        sort: {
            title: 1
        },
        limit: 10,
        page: 1
    }
    const { category } = filter;
    filter.category = mongoose.Types.ObjectId(category);
    return await Course.paginate(filter, options);
}

/**
 * Query for courses by their titles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResults>}
**/
const queryCoursesByTitle = async (filter, options) => {
    if (!filter) filter = {};
    if (!options) options = {
        sort: {
            title: 1
        },
        limit: 10,
        page: 1
    }
    return await Course.find(filter, options);
}
 
module.exports = {
  createCourse,
  queryCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  queryCoursesByCategoryId,
  queryCoursesByTitle
};
