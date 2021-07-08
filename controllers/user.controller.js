const { userService } = require('../services');

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
  

module.exports = {
    createUser,
    updateProfile,
}