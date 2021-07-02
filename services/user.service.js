const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');

const otpService = require('./otp.service');
const mailer = require('./nodemailer.service');

const { User } = require('../models');
const ApiError = require('../utils/ApiError');
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
        const {otp, hash} = otpService.generateOTP(user.email);
        console.log(otp, hash);

        //send mail after create account
        mailer.sendOTP(user.email, otp);
        //console.log(user);
        return { user, hash };
    } catch (error) {
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

const updateUserProfile = async (id, userInfo) => {
	const result = await User.findByIdAndUpdate({_id: id}, userInfo, {new: true});
	return result.toObject();
};

module.exports = {
    isEmailTaken,
    createUser,
    getUserByEmail,
    updateUserProfile,
}
