import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc        Get all products
// @route       GET api/products
// @access      Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (!products) {
    res.status(404);
    throw new Error('Resource not found');
  }

  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
});

// @desc        Get single product
// @route       GET api/products/:id
// @access      Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Resource not found');
  }

  res.status(200).json({ success: true, data: product });
});

export { getProducts, getProduct };
