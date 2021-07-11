const { authService, tokenService, userService, otpService, nodemailerService } = require('../services');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        // console.log(user);
        //const accessToken = await tokenService.generateAuthTokens(user);
        const { otp, hash } = otpService.generateOTP(user.email);
        const result = await nodemailerService.sendOTP(user.email, otp);
        console.log(result);
        res.status(201).json(
            { 
                message: 'Successfully Registered! Please activate your account by providing the otp sent to you through your email', 
                data: user, 
                //accessToken: accessToken.token, 
                //expiresIn: accessToken.expires,
                otp,
                hash
            }
        );
    } catch (error) {
        // console.log(error);
        res.status(error.statusCode || 500).json({message: error.message});
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    //console.log(email + password);
    try {
        const user = await authService.loginWithEmailAndPassword(email, password);
        // console.log(user);
        const accessToken = await tokenService.generateAuthTokens(user);
        // console.log(accessToken);
        res.status(200).json({ message: 'Successfully Logged In', data:  { user, accessToken: accessToken.token, expiresIn: accessToken.expires } });
    } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
    }
};

const changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
        return res.status(400).json('Old password and new password is required');
      }
      const accessToken = req.headers['x-access-token'];
      const user = await tokenService.verifyToken(accessToken);
      const result = await userService.changePassword(user, oldPassword, newPassword);
      if (!result) {
        return res.status(500).json('Cannot change password');
      }
      res.status(200).json('Change password successfully');
    } catch (error) {
      res.status(error.statusCode || 500).json({message: error.message});
    }
  };
  


module.exports = {
    register,
    login,
    changePassword,
}