const mongoose = require('mongoose');
const { Category } = require('../models');

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
const deleteCourseById = async (catId) => {
    return await Category.findByIdAndDelete(mongoose.Types.ObjectId(catId));
};

module.exports = {
    createCategory,
    getCategoryById,
    getCategories,
    updateCategoryById, 
    deleteCourseById,
}