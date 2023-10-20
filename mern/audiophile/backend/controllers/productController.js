import asyncHandler from '../middleware/asyncHandler.js';
import advancedResults from '../middleware/advancedResults.js';
import Product from '../models/productModel.js';

// @desc        Get all products
// @route       GET /api/v1/products
// @access      Public
const getProducts = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

// @desc        Get single product
// @route       GET /api/v1/products/:id
// @access      Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status = 404;
    throw new Error('Resource not found');
  }

  res.status(200).json({ success: true, data: product });
});

export { getProduct, getProducts };
