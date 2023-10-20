const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 250,
      required: [true, 'Please add a blog title'],
    },
    slug: String,
    body: {
      type: String,
      required: [true, 'Please add a body'],
    },
    author: {
      type: String,
      enum: ['Sarah Jane', 'John Doe'],
      required: [true, 'Please select an author'],
    },
  },
  {
    timestamps: true,
  }
);

// Create slug based on Blog title
blogSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
