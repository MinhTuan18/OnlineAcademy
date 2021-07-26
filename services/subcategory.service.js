const mongoose = require('mongoose');
const { SubCategory, Course, RegisteredCourse } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const moment = require('moment');

/**
 * Create a category
 * @param {Object} categoryInfo
 * @returns {Promise<Category>}
**/
const createCategory = async (categoryInfo) => {
    return await SubCategory.create(categoryInfo);
};

/**
 * Get a category by id
 * @param {ObjectId} catId
 * @returns {Promise<Category>}
**/
const getCategoryById = async (catId) => {
    return await SubCategory.findById(mongoose.Types.ObjectId(catId));
};

/**
 * Get a categories
 * @returns {Promise<Category>}
**/
const getCategories = async () => {
    return await SubCategory.paginate();
};

/**
 * Update a category by id
 * @param {ObjectId} catId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
**/
const updateCategoryById = async (catId, updateBody) => {
    const options = {
        new: true,
        omitUndefined: true
    }
    return await SubCategory.findByIdAndUpdate(mongoose.Types.ObjectId(catId), updateBody, options);
};

/**
 * Delete category by id
 * @param {ObjectId} catId
 * @returns {Promise<category>}
**/
const deleteCategoryById = async (catId) => {
    const courses = await Course.find({ category: mongoose.Types.ObjectId(catId) });
    if (courses && courses.length) {
        throw new ApiError('This Category have some courses!', httpStatus.BAD_REQUEST);
    }
    return await SubCategory.findByIdAndDelete(mongoose.Types.ObjectId(catId));
};

/**
 * Query for subcategories
 * @param {Object} filter - Query filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc) and seperated by ','
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
**/
const querySubCategories = async (filter, options) => {
    const { subcategory } = filter;
    if (subcategory) {
        filter.category = mongoose.Types.ObjectId(category);
    }
    const subcategories = await SubCategory.paginate(filter, options);
    return subcategories;
};

/**
 * Query for top 4 most registered subcategories last 7 days
 * @returns {Promise<QueryResult>}
**/
const queryMostRegisteredSubCategoryLast7Days = async () => {
    const startingPoint = moment().subtract(7, 'days').toDate().toISOString();
    console.log(startingPoint);
    const registeredCourses = await RegisteredCourse.aggregate([
        {
            $project: {
                course: 1,
                student: 1,
                createdAt: 1,
                registeredInLast7Days: {
                    $gte: ['$createdAt', startingPoint]
                }
            },
        },
        {
            $match: {
                registeredInLast7Days: true,
            },
        },
        {
            $project: {
                registeredInLast7Days: 0,
            }
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'course',
            },            
        },
        {
            $lookup: {
                from: 'subcategories',
                localField: 'course.subCategory',
                foreignField: '_id',
                as: 'course.subCategory',
            },
        },
        
        {
            $addFields: {
                subCategoryId: '$course.subCategory._id',
            },
        },

        {
            $unwind: '$course.subCategory'
        },
        {
            $unwind: '$subCategoryId'
        },
        {
            $project: {
                'course.subCategory': 0,
            }
        },
        {
            $group: 
            { 
                _id: { subCategoryId : '$subCategoryId' },
                // subCategoryId: { "$first": "$subCategoryId" },
                count: { $sum: 1 }
            } 
        },
        { $sort: { count: -1 } },
        { $limit: 4 },
        {
            $lookup: {
                from: 'subcategories',
                localField: '_id.subCategoryId',
                foreignField: '_id',
                as: '_id.subCategory',
            },
        },
        {
            $addFields: {
                subCategory: '$_id.subCategory',
            },
        },
        {
            $unwind: '$subCategory'
        },
        {
            $project: {
                '_id': 0,
            }
        },
    ]);
    return registeredCourses;
}

module.exports = {
    createCategory,
    getCategoryById,
    getCategories,
    updateCategoryById,
    deleteCategoryById,
    querySubCategories,
    queryMostRegisteredSubCategoryLast7Days,
}