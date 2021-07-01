const moment = require('moment');
const jwt = require('jsonwebtoken');
const envCconfigs = require('../configs/enviroment-config');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const accessExpirationMinutes = 30;
const jwt_secret = 'secret_cat';
/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
**/
const generateToken = (userId, expires, type) => {
    // console.log(expires);

    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };
    console.log(payload);
    return jwt.sign(payload, jwt_secret);
};

/**
 * Generate authentication tokens
 * @param {User} user
 * @returns {Promise<Object>}
**/
const generateAuthTokens = (user) => {
    //console.log(user._id);
    const accessTokenExpires = moment().add(accessExpirationMinutes, 'minutes');
    console.log(accessTokenExpires);

    const accessToken = generateToken(user._id, accessTokenExpires, 'access');
    // console.log(accessToken);
    
    return {
        token: accessToken,
        expires: accessTokenExpires.toString()
    };
};

/**
 * Verify token
 * @param {string} token
 * @param {string} type
 * @returns {Promise<User>}
**/
const verifyToken = async (token) => {
    // console.log(token);
    try {
        const payload = jwt.verify(token, jwt_secret);
        // console.log(payload);

        const user = await User.findById({ _id: payload.sub });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new ApiError('Invalid access token', httpStatus.FORBIDDEN, error);
    }
};

module.exports = {
    generateAuthTokens,
    verifyToken,
}