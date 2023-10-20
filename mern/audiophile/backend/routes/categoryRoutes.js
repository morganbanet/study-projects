import express from 'express';
import Category from '../models/categoryModel.js';
import advancedResults from '../middleware/advancedResults.js';

import {
  getCategories,
  getCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.route('/').get(
  advancedResults(Category, {
    path: 'products',
    select: 'name price new featured categoryImage description',
  }),
  getCategories
);

router.route('/:id').get(getCategory);

export default router;
