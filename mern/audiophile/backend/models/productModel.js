import mongoose from 'mongoose';
import slugify from 'slugify';

const imageSchema = new mongoose.Schema(
  {
    mobile: { type: String },
    tablet: { type: String },
    desktop: { type: String, default: 'no-img.jpg' },
  },
  {
    _id: false,
  }
);

const includesSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: [true, 'Please add the name of included item'],
    },
    quantity: {
      type: Number,
      min: [1, 'Quantity of included item must be a minimum of 1'],
      required: [true, 'Please add quantity of included item'],
    },
  },
  {
    _id: false,
  }
);

const productSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    categoryRef: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true],
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add a product name'],
    },
    slug: String,
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    new: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    featuredPosition: {
      type: Number,
      min: [0, 'Position must be a minimum of 1'],
      max: [4, 'Position can be a maximum of 4'],
    },
    featuredImage: { type: imageSchema, default: () => ({}) },
    productImage: { type: imageSchema, default: () => ({}) },
    category: {
      type: 'String',
      enum: ['Headphones', 'Speakers', 'Earphones'],
      required: [true, 'Please choose a category'],
    },
    categoryImage: { type: imageSchema, default: () => ({}) },
    gallery: {
      first: { type: imageSchema, default: () => ({}) },
      second: { type: imageSchema, default: () => ({}) },
      third: { type: imageSchema, default: () => ({}) },
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    features: {
      type: String,
      required: [true, 'Please add a features section'],
    },
    includes: [includesSchema],
  },
  {
    timestamps: true,
  }
);

// Create slug from name field
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
