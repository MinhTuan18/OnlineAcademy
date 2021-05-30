const categoryModel = require('../models/category.model');

module.exports = {
  addNewCategory: function (req, res) {
    const { categoryName } = req.body;
    console.log(categoryName);
    if (!categoryName){
      res.status(400).json("Category name is required!");
      return;
    }
    //Create new category
    const category = categoryModel.addCategory(categoryName);
    console.log(category);
    if (!category && !category.id){
      res.status(500).json("Please try again later");
      return;
    }
    res.status(201).json({
      message: "Create category successfully!",
      data: category,
    });
  }
}