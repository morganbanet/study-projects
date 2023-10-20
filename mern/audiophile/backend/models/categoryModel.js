import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a category name'],
    },
    slug: String,
    tabPosition: {
      type: Number,
      min: [1, 'Category position must be a minimum of 1'],
      max: [3, 'Category position must be a maximum of 3'],
      required: [true, 'Please add a position for the tab'],
      unique: [true, 'Category position cannot overlap'],
    },
    image: {
      type: String,
      required: [true, 'Please enter a category image'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'categoryRef',
  justOne: false,
});

categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Category = new mongoose.model('Category', categorySchema);
export default Category;
