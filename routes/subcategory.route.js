const express = require('express');
const { subcategoryController } = require('../controllers');
const auth = require('../middlewares/auth.mdw');
const router = express.Router();

router
  .route('/')
  .post(auth, subcategoryController.createCategory);


router.get('/:id', subcategoryController.getCategoryById);

router.get('/', subcategoryController.getSubCategories);


router.post('/:id', auth, subcategoryController.updateCategory);

router.delete('/:id', auth, subcategoryController.deleteCategory);

module.exports = router;