const { userService, otpService, tokenService, nodemailerService } = require('../services');

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
  const id = req.params.id;
  if (!id) {
    return res.status(400).json("User ID is required!!!");
  }

  try {
    const user = await userService.updateUserProfile(id, userInfo);
    delete user.password;

    res.status(200).json(user);
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
    res.status(error.statusCode || 500).json({message: error.message});
  }
};

const resendOTP = async (req, res) => {
  const email = req.body.email;
  try {
    if (!email) {
      return res.status(400).json('Email is required!');
    }
    const user = await userService.getUserByEmail(email);
    if(!user) {
      return res.status(400).json('User is not exist');
    }

    const { otp, hash } = otpService.generateOTP(user.email);
    const result = await nodemailerService.sendOTP(user.email, otp);
    return res.status(200).json({ 
                message: 'Resend OTP success', 
                otp,
                hash
            });
  } catch (error) {
    res.status(error.statusCode || 500).json({message: error.message});
  }
};

module.exports = {
    createUser,
    updateProfile,
    activatedAccount,
    resendOTP,
}