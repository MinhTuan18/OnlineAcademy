const { authService } = require('../services');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const rftokenSize = 70;

const login = async (req, res) => {
    const { email, password } = req.body;
    //console.log(email + password);
    try {
        const user = await authService.loginWithEmailAndPassword(email, password);
        const payload = { userId: user._id };
        const opts = { expiresIn: 10*60 };
        const accessToken = jwt.sign(payload, 'SECRET_CAT', opts);
        // const refreshToken = randomstring.generate(rftokenSize);
        // await clientModel.updateRfToken(client.id, refreshToken);
        //console.log(user);
        // const tokens = await tokenService.generateAuthTokens(user);
        res.status(200).json({ message: 'Successfully Logged In', data:  { user, accessToken } });
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    login,
}