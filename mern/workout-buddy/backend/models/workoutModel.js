const mongoose = require('mongoose');
const { Schema } = mongoose;
const slugify = require('slugify');

const workoutSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Workout must include a title'],
      maxlength: [200, 'Workout title must not exceed 200 characters'],
    },
    reps: {
      type: Number,
      required: [true, 'Workout must include a number of reps'],
    },
    load: {
      type: Number,
      required: [true, 'Workout must include a load'],
    },
    slug: String,
  },
  {
    timestamps: true,
  }
);

workoutSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Workout', workoutSchema);
