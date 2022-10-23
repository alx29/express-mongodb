const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json(categories);
});

const setCategory = asyncHandler(async (req, res) => {
  if (!req.body.Category_name) {
    res.status(400);

    throw new Error('Please add a category name field');
  }

  const category = await Category.create({
    Category_name: req.body.Category_name,
  });

  res.status(200).json(category);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  const deletedCategory = await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: `DELETE CATEGORY ${req.params.id}` });
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found!');
  }

  const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedCategory);
});

module.exports = { getCategories, setCategory, deleteCategory, updateCategory };
