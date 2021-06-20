const mongoose = require('mongoose');
const validator = require('validator'); // For validating a string
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email Address Is Required'],
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        password: {
            type: String,
            required: [true, 'Password Is Required'],
            trim: true,
            minlength: 6,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-z]/) || !value.match(/[A-Z]/)) {
                    throw new Error('Password must contain at least one upcase letter and one number');
                }
            },
            // private: true, // used by the toJSON plugin
        },
        name: {
            type: String,
            required: [true, 'User Name Is Required'],
            trim: true,
        },
        role: {
            // ['user', 'instructor', 'admin']
            type: String,
            trim: true,
            default: 'user',
        },
        isActivated: {
            type: Boolean,
            default: false,
        },
        registeredCourses: {
            type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Course' }],
            default: [],
        },
        watchlist: {
            type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Course' }],
            default: [],
        },
    },
    {
        timestamps: true,
        collection: 'users',
    }
);

UserSchema.set('toObject', { getters: true });
UserSchema.set('toJSON', { getters: true });
UserSchema.plugin(mongoosePaginate);

// /**
//  * Check if password matches the user's password
//  * @param {string} password
//  * @returns {Promise<boolean>}
// **/
// UserSchema.methods.isPasswordCorrect = async (password) => {
//     const user = this;
//     console.log(user);
//     console.log(password);
//     return bcrypt.compare(password, user.password);
// };

// // Hash password before saving new user
// UserSchema.pre('save', async (next) => {
//     const user = this;
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 10);
//     }
//     next();
// });

/**
 * @typedef User
**/
const User = mongoose.model('User', UserSchema);

module.exports = User;
