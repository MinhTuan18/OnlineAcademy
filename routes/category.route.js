const express = require('express');
const categoryModel = require('../models/category.model');
const categoryController = require('../controllers/category.controller');
const router = express.Router();

router.get('/', function(req, res) {
  res.status(200).json({message: 'OK'});
});

router.post('/', categoryController.addNewCategory);

module.exports = router;