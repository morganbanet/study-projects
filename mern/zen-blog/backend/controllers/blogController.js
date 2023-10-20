const asyncHandler = require('../middleware/asyncHandler');
const Blog = require('../models/BlogModel');

// @desc        Get all blogs
// @route       GET api/blogs
// @Access      Public
exports.getBlogs = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

// @desc        Get Single blog
// @route       GET api/blogs/:id
// @Access      Public
exports.getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error(`Blog not found with the id ${req.params.id}`);
  }

  res.status(200).json({ success: true, data: blog });
});

// @desc        Create blog
// @route       POST api/blogs
// @Access      Public
exports.createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create(req.body);

  res.status(201).json({ success: true, data: blog });
});

// @desc        Update blog
// @route       PUT api/blogs/:id
// @Access      Public
exports.updateBlog = asyncHandler(async (req, res) => {
  let blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error(`Blog not found with the id of ${req.params.id}`);
  }

  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({ success: true, data: blog });
});

// @desc        Delete blog
// @route       DELETE api/blogs
// @Access      Public
exports.deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error(`Blog not found with the id of ${req.params.id}`);
  }

  await blog.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
