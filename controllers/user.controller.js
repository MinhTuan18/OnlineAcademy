const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getUserById: async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json("User ID is required!!!");
    }
    try {
      const user = await userModel.getUserById(id);
      if (!user) {
        return res.status(204).json();
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  addNewUser: async (req, res) => {
    const user = req.body;
    if (!user.email || !user.password || !user.fullName) {
      return res.status(400).json();
    }
    try {
      const isEmailExist = await userModel.checkEmailExist(user.email); //Check email exist
      if (isEmailExist) {
        return res.status(400).json(`Email ${user.email} exist!`);
      }
      user.password = bcrypt.hashSync(user.password, 10);

      const newUser = await userModel.addNewUser(user);
      delete newUser.password;
      console.log(newUser);

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
