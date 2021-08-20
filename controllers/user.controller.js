const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { userService, otpService, tokenService, nodemailerService, courseService } = require('../services');
const bcrypt = require('bcryptjs')

const createUser = async (req, res) => {
  try {
    const { user, hash } = await userService.createUser(req.body);
    res.status(201).json({
      message: 'Successfully Created New User',
      data: user,
      otpHash: hash
    });
  } catch (error) {
    res.status(400).json(error.message);
  }

};

const updateProfile = async (req, res) => {
  const userInfo = req.body;
  const id = req.params.userId;
  if (!id) {
    return res.status(400).json("User ID is required!!!");
  }

  if (!userInfo.passwordConfirm) {
    return res.status(400).json("User password is required!!!");
  }
  try {
    const accessToken = req.headers['x-access-token'];
    const userVerified = await tokenService.verifyToken(accessToken);
    if (!bcrypt.compareSync(userInfo.passwordConfirm, userVerified.password)) {
      throw new ApiError('Incorrect Password', httpStatus.BAD_REQUEST);
    }

    const { otp, hash, email } = userInfo;
    if (email) {
      // if(userService.isEmailTaken(email)) {
      //   return res.status(400).json("Email taken");
      // }

      if (otp && hash) {
        result = await otpService.verifyOTP(otp, hash, email);
        if (result === false) {
          return res.status(400).json("OTP invalid");
        }
      } else {
        return res.status(400).json("OTP missing");
      }
    } else {
      delete userInfo.email
    }

    const user = await userService.updateUserProfile(id, userInfo);
    delete user.password;

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const activatedAccount = async (req, res) => {
  const { otp, hash, email } = req.body;
  try {
    result = await userService.activatedAccount(email, otp, hash);
    res.status(200).json("Activate account successfully");
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const resendOTP = async (req, res) => {
  const email = req.body.email;
  try {
    if (!email) {
      return res.status(400).json('Email is required!');
    }
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(400).json('User is not exist');
    }

    const { otp, hash } = otpService.generateOTP(user.email);
    const result = await nodemailerService.sendOTP(user.email, otp);

    return res.status(200).json({ 
                message: 'Resend OTP successfully', 
                otp,
                hash
            });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateWatchlist = async (req, res) => {
  const { userId } = req.params;
  const { courseId } = req.body;
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError('User not found', httpStatus.NO_CONTENT);
  }
  console.log(user);
  const course = await courseService.getCourseById(courseId);
  if (!course) {
    throw new ApiError('Course not found', httpStatus.NO_CONTENT);
  }
  // console.log(course);
  try {
    await userService.updateWatchlist(user, course);
    res.status(200).json({
      success: true,
      message: 'Successfully added course to watch list'
    })
  } catch (error) {
    // console.log(error.message);
    res.status(401).json({ message: error.message });
  }
}

const getInfo = async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);
  if (!user) {
    return res.status(401).json({ message: 'User not found' })
  }
  return res.status(200).json(user)
}

const buyCourse = async (req, res) => {
  const { userId } = req.params;
  const { courseId } = req.body;
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError('User not found', httpStatus.NO_CONTENT);
  }
  console.log(user);
  const course = await courseService.getCourseById(courseId);
  if (!course) {
    throw new ApiError('Course not found', httpStatus.NO_CONTENT);
  }
  // console.log(course);
  try {
    await userService.buyCourse(user, course);
    res.status(200).json({
      success: true,
      message: 'Successfully added course to registered'
    })
  } catch (error) {
    // console.log(error.message);
    res.status(401).json({ message: error.message });
  }
}

const getCreatedCourses = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError('User not found', httpStatus.NO_CONTENT);
    }
    const createdCourses = await userService.getCreatedCoursesByUserId(userId);
    res.status(200).json({message: 'Get instructor created course list successfully', createdCourses})
  } catch (error) {
    res.status(error.statusCode).json({message: error.message});
  }
}

module.exports = {
  createUser,
  updateProfile,
  activatedAccount,
  resendOTP,
  updateWatchlist,
  getInfo,
  getCreatedCourses,
  buyCourse,
}
