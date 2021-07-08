const { authService, tokenService } = require('../services');
const randomstring = require('randomstring');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const rftokenSize = 70;

const login = async (req, res) => {
    const { email, password } = req.body;
    //console.log(email + password);
    try {
        const user = await authService.loginWithEmailAndPassword(email, password);
        console.log(user);
        const accessToken = await tokenService.generateAuthTokens(user);
        console.log(accessToken);
        res.status(200).json({ message: 'Successfully Logged In', data:  { user, accessToken: accessToken.token, expiresIn: accessToken.expires } });
    } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
    }
};

module.exports = {
    login,
}