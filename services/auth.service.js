const httpStatus = require('http-status');
// const tokenService = require('./token.service');
const userService = require('./user.service');
// const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { User } = require('../models');
const bcrypt = require("bcryptjs");

// const { tokenTypes } = require('../config/tokens');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
**/
const loginWithEmailAndPassword = async (email, password) => {
    try {
        const user = await userService.getUserByEmail(email);
        //console.log(user);
        if (!user) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'User Not Existed');
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect Password');
        }
        return user;
    } catch (error) {
        throw new Error(error);
    }
};


module.exports = {
  loginWithEmailAndPassword,
};
