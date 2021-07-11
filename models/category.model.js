const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'categories',
  }
);


CategorySchema.set('toObject', { getters: true });
CategorySchema.set('toJSON', { getters: true });
CategorySchema.plugin(mongoosePaginate);


const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;