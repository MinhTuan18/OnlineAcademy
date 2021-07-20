const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ChapterSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Course',
    },
    index: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true, 
    }
  },
  {
    timestamps: true,
    collection: 'chapters',
  }
);

ChapterSchema.set('toObject', { getters: true });
ChapterSchema.set('toJSON', { getters: true });


const Chapter = mongoose.model('Chapter', ChapterSchema);

module.exports = Chapter;