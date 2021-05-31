const categoryModel = require('../models/category.model');

module.exports = {
  addNewCategory: function (req, res) {
    const name  = req.body.name;
    console.log(name);
    if (!name){
      return res.status(400).json("Category name is required!");
    }
    const category = categoryModel.addCategory(name);
    console.log(category);
    if (!category && !category.id){
      return res.status(500).json("Please try again later");
    }
    res.status(201).json({
      message: "Create category successfully!",
      data: category,
    });
  },

  getAllCategory: function (req, res) {
    categoryModel.getAllCategory((err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(result);
    })
  },
  
  getCategoryById: function (req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json("Category Id is required");
    }
    categoryModel.getCategoryById(id, (err, result) => {
      if (err) {
        return res.status(400).json(err.message);
      }
      if (!result.length) {
        return res.status(204).json();
      }
      res.status(200).json(result);
    });
  },

  updateCategory: function (req, res) {
    const id = req.params.id;
    const { name }= req.body;
    if (!id) {
      return res.status(400).json("Category id is required!");
    }
    if (!name) {
      return res.status(400).json("Category name is required!");
    }
    categoryModel.updateCategory(id, name, (err, result) => {
      if (err) {
        return res.status(500).json(err.message);
      }
      return res.status(200).json("Update category successfully");
    })
  },

  deleteCategory: async function (req, res) {
    const id = req.params.id;
    try {
      const category = await categoryModel.deleteCategory(id);
      if (!category) {
        return res.status(204).json();
      }
    return res.status(200).json("Delete category successfully");
    } catch (error) {
      return res.status(500).json();
    }
    
  }
}