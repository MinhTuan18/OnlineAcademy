const mongoose = require('mongoose');
const { Category } = require('../models');

/**
 * Get category by id
 * @param {ObjectId} catId
 * @returns {Promise<Category>}
**/
const getCategoryById = async (catId) => {
    return await Category.findById(catId);
};

module.exports = {
    getCategoryById,
}