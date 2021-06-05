const categoryModel = require('../models/category.model');

module.exports = {
  addNewCategory: function (req, res) {
    const name  = req.body.name;
    if (!name){
      return res.status(400).json("Category name is required!");
    }
    const category = categoryModel.addnewCategory(name);
    if (!category && !category.id){
      return res.status(500).json("Please try again later");
    }
    res.status(201).json({
      message: "Create category successfully!",
      data: category,
    });
  },

  getAllCategory: async function (req, res) {
    const listCategory = await categoryModel.getAllCategory();
    return res.status(200).json(listCategory);
  },
  
  getCategoryById: async function (req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json("Category Id is required");
    }
    try {
      const category = await categoryModel.getCategoryById(id);
      if (!category){
        return res.status(204).json();
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  updateCategory: async function (req, res) {
    const id = req.params.id;
    const name= req.body.name;
    if (!id) {
      return res.status(400).json("Category id is required!");
    }
    if (!name) {
      return res.status(400).json("Category name is required!");
    }
    try {
      const category = await categoryModel.updateCategory(id, name);
      if (!category){
        return res.status(204).json();
      }
      res.status(200).json({
        message: "Update category successfully!",
        data: category,
      });
    }
    catch (error) {
      res.status(500).json(err.message);
    }
  },

  deleteCategory: async function (req, res) {
    const id = req.params.id;
    console.log(id);
    try {
      const category = await categoryModel.deleteCategory(id);
      if (!category) {
        return res.status(204).json();
      }
    return res.status(200).json("Delete category successfully");
    } catch (error) {
      return res.status(500).json(error.message);
    }
    
  }
}