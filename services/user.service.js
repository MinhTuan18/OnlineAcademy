const mongoose = require('mongoose');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');


/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
**/
const isEmailTaken = async (email) => {
  const user = await User.findOne({ email });
  //console.log(user);
  if (!user) return false;
  return true;
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
**/
const createUser = async (userBody) => {
    // console.log(await isEmailTaken(userBody.email));
    if (await isEmailTaken(userBody.email)) {
        //console.log('2');
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email has been already taken');
    }
    try {
        userBody.password = bcrypt.hashSync(userBody.password, 10);
        const user = await User.create(userBody);
        //console.log(user);
        return user;
    } catch (error) {
        //console.log(error);
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
**/
const getUserByEmail = async (email) => {
    return User.findOne({ email });
};

//merge by mt
const getAllUsers = async () => {
	const users = await User.find();
  return users;
};
  
const getUserById = async (id) => {
	const user = await User.findById(id);
	return user;
};
  
const addNewUser = async (user) => {
	const newUser = new Users(user);
	const result = await newUser.save();
	return result.toObject();
};
  
const updateUserProfile = async (id, userInfo) => {
	const result = await User.findByIdAndUpdate({_id: id}, userInfo, {new: true});
	return result.toObject();
};

const blockUser = async (id, status) => {
	const result = await User.findByIdAndUpdate({_id: id}, {isBlocked: status}, {new: true});
	return result;
};
  
module.exports = {
    isEmailTaken,
    createUser,
    getUserByEmail,
    
    getAllUsers,
    getUserById,
    addNewUser,
    updateUserProfile,
    blockUser,
}
