const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'student','tutor'],
    default: 'student',
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  }
});



UserSchema.set('toObject', { getters: true });
UserSchema.set('toJSON', { getters: true });

const Users = mongoose.model('User', UserSchema);

module.exports = {
  async getAllUsers() {
    const users = await Users.find();
    return users;
  },

  async getUserById(id) {
    const user = await Users.findById(id);
    return user;
  },

  async addNewUser(user) {
    const newUser = new Users(user);
    // newUser.save((err) => {
    //   if (err) {
    //     console.log("error", err);
    //     return null;
    //   }
    //   console.log(newUser);
    //   return newUser;
    // });
    const result = await newUser.save();
    return result.toObject();
  },

  async checkEmailExist(email) {
    const user = await Users.findOne({email: email});
    if (!user) {
      return false;
    }
    return true;
  },

  async updateUserProfile(id, userInfo) {
    const result = await Users.findByIdAndUpdate({_id: id}, userInfo, {new: true});
    return result.toObject();
  },

  async blockUser(id, status) {
    const result = await Users.findByIdAndUpdate({_id: id}, {isBlocked: status}, {new: true});
    return result;
  }
};