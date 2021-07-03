const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// const Category = require('./category.model');

const CourseSchema = new mongoose.Schema(
    {
        title: {
            type: String, 
            required: [true, 'Course Title Is Required'],
            index: true,
        },
        category: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category',
            required: [true, 'Course Category Is Required'],
        },
        thumbnailImageUrl: {
            type: String, 
            trim: true,
            default: '',
        },
        // instructor: {
        //     type: mongoose.SchemaTypes.ObjectId,
        //     ref: 'Instructor',
        //     required: true,
        // },
        shortDesc: {
            type: String, 
            default: '',
        },
        detailDesc: {
            type: String, 
            default: '',
        },
        averageRating: {
            type: Number, 
            min: 0, 
            max: 5, 
            default: 0.0,
        },
        comments: {
            type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' }],
            default: [],
        },
        registeredStudents: {
            type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
            default: [],
        },
        // numOfRatings: {
        //     type: Number, 
        //     default: 0,
        // },
        // numOfRegistrations: {
        //     type: Number, 
        //     default: 0,
        // },
        fee: {
            type: Number, 
            default: 0,
        },
        discount: {
            type: Number, 
            default: 0.0, 
            min: 0, 
            max: 1,
        },
        status: {
            // 'Complete', 'Ongoing'
            type: String, 
            trim: true,
            default: 'Ongoing',
        } 
    },
    {
        timestamps: true,
        collection: 'courses',
    }
);

// text search
CourseSchema.index({ title: 'text' });

// CourseSchema.statics.getCourseByCategoryID = function (id) {
//   return this.find({ categoryID: id })
//   .then((value) => {
//     return value;
//   })
//   .catch((err) => {
//     throw err;
//   });
// }

// CourseSchema.statics.searchCourseByTitle = function (query) {
//   return this.find({ $text: { $search: query } })
//     .then((value) => {
//       return value;
//     })
//     .catch((err) => {
//       throw err;
//     });
// }

CourseSchema.set('toObject', { getters: true });
CourseSchema.set('toJSON', { getters: true });
CourseSchema.plugin(mongoosePaginate);

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;

