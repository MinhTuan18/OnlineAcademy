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

// CategorySchema.statics.getAllCategory = async function () {
//   const categories = await this.find();
//   return categories;
// }

// CategorySchema.statics.getCategoryById = async function (categoryID) {
//   /* return this.findOne({_id: categoryID })
//     .then((value) => {
//       return value;
//     })
//     .catch((err) => {
//       throw err;
//     }); */

//     const category = await this.findOne({_id: categoryID});
//     return category;
// };

// CategorySchema.statics.updateCategory = async function (id, categoryName) {
//   const result = await this.findByIdAndUpdate({_id: id}, {name: categoryName}, {new: true});
//   return result;
// }

// CategorySchema.statics.deleteCategory = async function (id) {
//   const result = await this.findByIdAndDelete(id);
//   return result;
// }

CategorySchema.set('toObject', { getters: true });
CategorySchema.set('toJSON', { getters: true });
CategorySchema.plugin(mongoosePaginate);


const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;