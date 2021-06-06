const express = require('express');
const categoryModel = require('../models/category.model');
const categoryController = require('../controllers/category.controller');
const router = express.Router();

router.get('/', categoryController.getAllCategory);

router.get('/:id', categoryController.getCategoryById);

router.post('/', categoryController.addNewCategory);

router.post('/:id', categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;