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

CategorySchema.statics.getAllCategory = function (callBack) {
  this.find({}, (error, result) => {
    if(error) {
        callBack(err);
    }
    else {
      callBack(null, result);
    }
  });
}

CategorySchema.statics.getCategoryById = function (categoryId, callBack) {
  this.find({_id: categoryId })
    .then((value) => {
      if (!value) {
        callBack({
          message: {
            msgBody: 'No category found!',
            msgError: true,
          },
        });
      } else {
        callBack(null, value);
      }
    })
    .catch((err) => {
      callBack(err);
    });
};

CategorySchema.statics.updateCategory = function (id, categoryName, callBack) {
  this.findOne({ _id: id })
    .then((document) => {
      if (!document) {
        callBack({
          message: {
            msgBody: 'Can not found category!',
            msgError: true,
          },
        });
      } else {
        this.update({ _id: id }, {name: categoryName}, (err, doc) => {
          if (err) {
            callBack(err);
          } else {
            callBack(null, doc);
          }
        });
      }
    })
    .catch((err) => {
      callBack(err);
    });
}

CategorySchema.statics.deleteCategory = async function (id) {
  return await this.findByIdAndDelete(id);
}
CategorySchema.set('toObject', { getters: true });
CategorySchema.set('toJSON', { getters: true });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;