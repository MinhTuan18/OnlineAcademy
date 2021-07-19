const { subcategoryService } = require('../services');

const createCategory = async (req, res) => {
  const categoryBody  = req.body;
  // // console.log(name);
  // if (!name){
  //   return res.status(400).json("Category name is required!");
  // }
  try {
    const category = await subcategoryService.createCategory(categoryBody);
    if (!category && !category.id){
      return res.status(500).json("Please try again later");
    }
    res.status(201).json({
      message: "Create category successfully!",
      data: category,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  createCategory,

  getAllCategory: async function (req, res) {
    const listCategory = await subcategoryService.getCategories();
    return res.status(200).json(listCategory);
  },
  
  getCategoryById: async function (req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json("Category Id is required");
    }
    try {
      const category = await subcategoryService.getCategoryById(id);
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
      const category = await subcategoryService.updateCategoryById(id, req.body);
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
    try {
      const category = await subcategoryService.deleteCategoryById(id);
      if (!category) {
        return res.status(204).json();
      }
    return res.status(200).json("Delete category successfully");
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
    
  },

  getSubCategories: async (req, res) => {
    const categoryId  = req.query.catId || '';
    const sortBy = req.query.sortBy || '';
    let filter = {};
    let options = {
        limit: req.query.limit || 10,
        page: req.query.page || 1
    }
    if (categoryId !== '') filter.category = categoryId;
    if (sortBy !== '') options.sort = {sortBy: 1};
    
    const subCategories = await subcategoryService.querySubCategories(filter, options);
    if (subCategories.length === 0) {
        return res.status(404).json({ message: 'Course Not Found'});
    }
    return res.status(200).json(subCategories);
}

}