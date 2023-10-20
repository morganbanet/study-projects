const express = require('express');
const advancedResults = require('../middleware/advancedResults');
const Blog = require('../models/BlogModel');

const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

const router = express.Router();

router.route('/').get(advancedResults(Blog), getBlogs).post(createBlog);
router.route('/:id').get(getBlog).put(updateBlog).delete(deleteBlog);

module.exports = router;
