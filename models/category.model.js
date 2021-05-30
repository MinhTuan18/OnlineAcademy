const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

CategorySchema.statics.addCategory = function (categoryName) {
  const newCategory = new this({
    name: categoryName,
  });

  newCategory.save(function(err){
    if (err){
      console.log("Error", err);
      return null;
    }
  });
  return newCategory;
}

CategorySchema.set('toObject', { getters: true });
CategorySchema.set('toJSON', { getters: true });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;