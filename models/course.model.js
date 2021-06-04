const mongoose = require('mongoose');
const Category = require('./category.model');

const CourseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    catID: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    coverImage: {type: String, default: ''},
    tutorID: {type: String, default: ''},
    shortDesc: {type: String, default: ''},
    detailDesc: {type: String, default: ''},
    rating: {type: Number, min: 0, max: 10, default: 0},
    numOfRatings: {type: Number, default: 0},
    numOfRegistrations: {type: Number, default: 0},
    fee: {type: Number, default: 0},
    discount: {type: Number, default: 0, min: 0, max: 1},
    status: {type: String, default: 'Ongoing'}
    },
    {timestamps: true}
);

CourseSchema.index({ title: 'text' });


CourseSchema.statics.getCourseByCategoryID = function (id) {
  return this.find({ categoryID: id })
  .then((value) => {
    return value;
  })
  .catch((err) => {
    throw err;
  });
}

CourseSchema.statics.searchCourseByTitle = function (query) {
  return this.find({ $text: { $search: query } })
    .then((value) => {
      return value;
    })
    .catch((err) => {
      throw err;
    });
}

CourseSchema.set('toObject', { getters: true });
CourseSchema.set('toJSON', { getters: true });

const Courses = mongoose.model('Course', CourseSchema);

module.exports = {
    async all() {
        const courses = await Courses.find();
        return courses;
    },

    async single(id) {
        const course = await Courses.findById(mongoose.Types.ObjectId(id));
        return course;
    },

    add (courseInfo) {
        const newCourse = new Courses(courseInfo);
        newCourse.save((err) => {
            if (err) {
                //console.log(err);
                return null;
            }
        })
        return newCourse;
    },

    update (id, updateInfo) {
        Courses.findByIdAndUpdate(mongoose.Types.ObjectId(id), updateInfo, {new: true}, (err) => {
            if (err) {
                console.log(err);
            }
        })
    },

    delete (id) {
        Courses.findByIdAndDelete(mongoose.Types.ObjectId(id), (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
};
