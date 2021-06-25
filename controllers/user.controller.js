const { userService } = require('../services');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({
            message: 'Successfully Created New User', 
            data: user
        });
    } catch (error) {
        res.status(400).json(error);
    }
    
};

module.exports = {
    createUser,
}