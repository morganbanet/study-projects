import express from 'express';
import Product from '../models/productModel.js';
import advancedResults from '../middleware/advancedResults.js';
import { getProducts, getProduct } from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(
  advancedResults(Product, {
    path: 'category',
    select: 'name',
  }),
  getProducts
);

router.route('/:id').get(getProduct);

export default router;
