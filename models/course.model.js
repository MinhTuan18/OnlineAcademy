const mongoose = require('mongoose');
const Category = require('./category.model');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  coverImage: {
    type: String,
  },
  tutorID: {
    type: String,
    required: true,
  },
  shortDesc: {
    type: String,
  },
  detailDesc: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
  numOfRating: {
    type: Number,
  },
  numOfRegistration: {
    type: Number,
    default: 0,
  },
  fee: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  lastModifed: {
    type: Date,
  },
  status: {
    type: Boolean,
    default: false, //False = OnGoing
  }
});

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

const Course = mongoose.model('Course', CourseSchema);
Course.createIndexes();
module.exports = Course;