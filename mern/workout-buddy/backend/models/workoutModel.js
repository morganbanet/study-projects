const mongoose = require('mongoose');
const { Schema } = mongoose;
const ErrorResponse = require('../utils/ErrorResponse');
const slugify = require('slugify');

const workoutSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
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

workoutSchema.statics.createWorkout = async function (body) {
  const { title, load, reps, user } = body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }

  if (!load) {
    emptyFields.push('load');
  }

  if (!reps) {
    emptyFields.push('reps');
  }

  if (emptyFields.length > 0) {
    throw new ErrorResponse('Please fill in all fields', 400, emptyFields);
  }

  const workout = await this.create({ title, load, reps, user });

  return workout;
};

module.exports = mongoose.model('Workout', workoutSchema);
