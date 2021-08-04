const tokenService = require('../services/token.service');

const auth = async (req, res, next) => {
    try {
        const accessToken = req.headers['x-access-token'];
        console.log(accessToken);
        if (!accessToken) {
            return res.status(404).json('Invalid authorization! Access token not found');
        }
        const verfication = await tokenService.verifyToken(accessToken);
        console.log(verfication);
        if (verfication) next();
    } catch (error) {
        res.status(error.statusCode || 500).json({message: error.message});
    }
}

const adminAuth = async (req, res, next) => {
    try {
    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
        return res.status(404).json('Invalid authorization! Access token not found');
    }
    
    const verfication = await tokenService.verifyToken(accessToken);
    if (!verfication || verfication.role !== 'admin') {
        return res.status(402).json('Access denied!');
    }
    next();
    } catch (error) {
        res.status(error.statusCode || 500).json({message: error.message});
    }
}
module.exports = {
    auth,
    adminAuth
}
