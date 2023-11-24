const mongoose = require('mongoose');
const colors = require('colors');

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please add a review title'],
      maxlength: 250,
    },
    text: {
      type: String,
      required: [true, 'Please add some text'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: [true, 'Please add a rating between 1 and 10'],
    },
    bootcamp: {
      type: mongoose.Schema.ObjectId,
      ref: 'Bootcamp',
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Static method to get average rating of botcammps
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  await this.model('Bootcamp').findByIdAndUpdate(
    bootcampId,
    {
      averageRating: obj[0].averageRating,
    },
    { new: true, runValidators: true }
  );
};

// Calculate average bootcamp rating
ReviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.bootcamp);
});

ReviewSchema.post('remove', function () {
  this.constructor.getAverageRating(this.bootcamp);
});

module.exports = mongoose.model('Review', ReviewSchema);
