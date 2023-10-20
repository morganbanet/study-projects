import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js';

// @desc        Get all categories
// @route       GET /api/v1/categories
// @access      Public
const getCategories = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

// @desc        Get single category
// @route       GET /api/v1/categories/:id
// @access      Public
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Resource not found');
  }

  res.status(200).json({ success: true, data: category });
});

export { getCategories, getCategory };
