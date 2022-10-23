const express = require('express');
const router = express.Router();
const {
  getCategories,
  setCategory,
  deleteCategory,
  updateCategory,
} = require('../controllers/categoryController');

router.route('/').get(getCategories).post(setCategory);

router.route('/:id').put(updateCategory).delete(deleteCategory);

module.exports = router;
