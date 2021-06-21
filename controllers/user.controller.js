const bcrypt = require('bcryptjs');

const nodeMailer = require('../middlewares/node-mailer.mdw');
const { userService } = require('../services');


const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json("User ID is required!!!");
  }
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(204).json();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addNewUser = async (req, res) => {
  const user = req.body;
  if (!user.email || !user.password || !user.fullName) {
    return res.status(400).json();
  }
  try {
    const isEmailExist = await userService.checkEmailExist(user.email); //Check email exist
    if (isEmailExist) {
      return res.status(400).json(`Email ${user.email} exist!`);
    }
    user.password = bcrypt.hashSync(user.password, 10);

    const newUser = await userService.addNewUser(user);
    delete newUser.password;
    console.log(newUser);

    //test send mail
    const result = await nodeMailer.sendOTP(newUser.email, 123123);
    if (result.success) {
      console.log('Send mail success');
    } else {
      console.log('Send mail failed');
      console.log(result.error);
    }
    
    res.status(201).json(newUser);
  } catch (error) {
      res.status(500).json(error.message);
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
    res.status(500).json(error.message);
  }
};



const blockUser = async (req, res) => {
  const {id, status} = req.body;
  if (!id) {
    return res.status(400).json('User ID is required!');
  }
  try {
    const result = await userService.blockUser(id, status);
    if (result) {
      res.status(200).json();
    }
    else {
      res.status(204).json();
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};


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

    getAllUsers,
    getUserById,
    addNewUser,
    updateProfile,
    blockUser,
}
