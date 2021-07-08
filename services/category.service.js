const mongoose = require('mongoose');
const { Category, Course } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * Create a category
 * @param {Object} categoryInfo
 * @returns {Promise<Category>}
**/
const createCategory = async (categoryInfo) => {
    return await Category.create(categoryInfo);
};

/**
 * Get a category by id
 * @param {ObjectId} catId
 * @returns {Promise<Category>}
**/
const getCategoryById = async (catId) => {
    return await Category.findById(mongoose.Types.ObjectId(catId));
};

/**
 * Get a categories
 * @returns {Promise<Category>}
**/
const getCategories = async () => {
    return await Category.paginate();
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
    return await Category.findByIdAndUpdate(mongoose.Types.ObjectId(catId), updateBody, options);
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
    return await Category.findByIdAndDelete(mongoose.Types.ObjectId(catId));
};

module.exports = {
    createCategory,
    getCategoryById,
    getCategories,
    updateCategoryById, 
    deleteCategoryById,
}