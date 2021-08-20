const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const otpService = require('./otp.service');


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
        throw new ApiError('Email has been already taken', httpStatus.BAD_REQUEST);
    }
    try {
        userBody.password = bcrypt.hashSync(userBody.password, 10);
        const user = await User.create(userBody);
        // const {otp, hash} = otpService.generateOTP(user.email);
        // // console.log(otp, hash);

        // //send mail after create account
        // mailer.sendOTP(user.email, otp);
        //console.log(user);
        return user;
    } catch (error) {
        throw new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
**/
const getUserById = async (id) => {
    return User.findById(mongoose.Types.ObjectId(id));
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
**/
const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const updateUserProfile = async (id, userInfo) => {
    const result = await User.findByIdAndUpdate({ _id: id }, userInfo, { new: true });
    return result.toObject();
};

const updateActivatedStatus = async (email) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new ApiError('User email not exist!', httpStatus.BAD_REQUEST);
    }
    if (user.isActivated) {
        throw new ApiError('This account have been activated', httpStatus.BAD_REQUEST);
    }
    return await User.findByIdAndUpdate({ _id: user.id }, { isActivated: true }, { new: true });
};

const changePassword = async (user, oldPassword, newPassword) => {
    if (!bcrypt.compareSync(oldPassword, user.password)) {
        throw new ApiError('Incorrect Password', httpStatus.BAD_REQUEST);
    }
    const paswordHash = bcrypt.hashSync(newPassword, 10);
    return await User.findByIdAndUpdate({ _id: user.id }, { password: paswordHash }, { new: true });
}
const updateWatchlist = async (user, course) => {
    const { _id: courseId } = course;
    const index = user.watchlist.findIndex(e => e.toString() === courseId.toString());

    if (index === -1) {
        try {
            return await User.findByIdAndUpdate(
                mongoose.Types.ObjectId(user.id),
                {
                    $push:
                    {
                        watchlist: courseId,
                    }
                }
            );
            // return true;
        } catch (error) {
            throw new ApiError('Failed to add course to watchlist', httpStatus.INTERNAL_SERVER_ERROR, error);
        }
    } else {
        try {
            return await User.findByIdAndUpdate(
                mongoose.Types.ObjectId(user.id),
                {
                    $pull:
                    {
                        watchlist: courseId,
                    }
                }
            );
            // return true;
        } catch (error) {
            throw new ApiError('Failed to add course to watchlist', httpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }
    throw new ApiError('This course has already been added to watchlist', httpStatus.BAD_REQUEST);

    // return false;
}

const { Course } = require('../models');

const buyCourse = async (user, course) => {
    const { _id: courseId } = course;
    const index = user.registeredCourses.findIndex(e => e.toString() === courseId.toString());
    const userIndex = course.registeredStudents.findIndex(e => e.toString() === user.id.toString());

    if (index === -1 || userIndex === -1) {
        try {
            return (
                await User.findByIdAndUpdate(
                    mongoose.Types.ObjectId(user.id),
                    {
                        $push:
                        {
                            registeredCourses: courseId,
                        }
                    }
                ) && await Course.findByIdAndUpdate(
                    mongoose.Types.ObjectId(courseId),
                    {
                        $push:
                        {
                            registeredStudents: user.id,
                        }
                    }
                )
            )
            // return true;
        } catch (error) {
            throw new ApiError('Failed to add course to registered', httpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }
    throw new ApiError('This course has already been added to registered', httpStatus.BAD_REQUEST);

    // return false;
}

/**
 * Add course to instructor's created courses by id
 * @param {ObjectId} userId
 * @param {ObjectId} courseId
 * @returns {Promise<User>}
**/
const updateCreatedCourses = async (userId, courseId) => {
    // const { _id: courseId } = course;
    try {
        return await User.findByIdAndUpdate(
            mongoose.Types.ObjectId(userId),
            { $push: 
                { 
                    createdCourses: courseId,
                } 
            }
        );
    } catch (error) {
        throw new ApiError('Failed to add course to created course list', httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

/**
 * Get instructor's created courses by instructor id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
**/
const getCreatedCoursesByUserId = async (userId) => {
    const createdCourses = await User.aggregate([
        {
            $match: {
                isBlocked: false,
                isActivated: true,
                role: 'instructor',
                _id: mongoose.Types.ObjectId(userId)
            },
        },
        {
            $project: {
                _id: 0,
                createdCourses: 1,
            },
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'createdCourses',
                foreignField: '_id',
                as: 'createdCourse',
            },
        },
        {
            $unwind: '$createdCourse'
        },
        {
            $project: {
                createdCourses: 0,
            },
        },
    ]);
    // const queryTotalResults = {
    //     isBlocked: false,
    //     isActivated: true,
    //     role: 'instructor',
    //     _id: mongoose.Types.ObjectId(userId)
    // };
    // const totalResults = await User.find(queryTotalResults).countDocuments();
    // const { courses, totalResults } = result;
    // const totalPages = Math.ceil(totalResults / limit);
  
    // return { courses, totalResults, totalPages, limit };
    return createdCourses;
}

module.exports = {
    isEmailTaken,
    createUser,
    getUserById,
    getUserByEmail,
    updateUserProfile,
    updateActivatedStatus,
    changePassword,
    buyCourse,
    updateWatchlist,
    updateCreatedCourses,
    getCreatedCoursesByUserId,
}
