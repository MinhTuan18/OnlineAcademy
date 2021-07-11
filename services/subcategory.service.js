const mongoose = require('mongoose');
const { SubCategory, Course } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

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

const querySubCategories = async (filter, options) => {
    const { subcategory } = filter;
    if (subcategory) {
        filter.category = mongoose.Types.ObjectId(category);
    }
    const subcategories = await SubCategory.paginate(filter, options);
    return subcategories;
};

module.exports = {
    createCategory,
    getCategoryById,
    getCategories,
    updateCategoryById,
    deleteCategoryById,
    querySubCategories,
}