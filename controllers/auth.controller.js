const { authService, tokenService } = require('../services');
const randomstring = require('randomstring');
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
        res.json(error);
    }
};

module.exports = {
    login,
}