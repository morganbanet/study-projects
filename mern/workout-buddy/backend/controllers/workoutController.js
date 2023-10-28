const asyncHandler = require('../middleware/asyncMiddleware');
const Workout = require('../models/workoutModel');

// @desc        Get workouts (for a user)
// @route       GET /api/workouts
// @access      Private
exports.getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({ user: req.user.id }).sort({
    createdAt: 'desc',
  });

  res
    .status(200)
    .json({ success: true, count: workouts.length, data: workouts });
});

// @desc        Get workout
// @route       GET /api/workouts/:id
// @access      Private
exports.getWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    res.status(404);
    throw new Error(`Workout not found with id ${req.params.id}`);
  }

  return res.status(200).json({ success: true, data: workout });
});

// @desc        Create workout
// @route       POST /api/workouts
// @access      Private
exports.createWorkout = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;

  const workout = await Workout.createWorkout(req.body);

  return res.status(201).json({ success: true, data: workout });
});

// @desc        Update workout
// @route       PATCH /api/workouts/:id
// @access      Private
exports.updateWorkout = asyncHandler(async (req, res) => {
  let workout = await Workout.findById(req.params.id);

  if (!workout) {
    res.status(404);
    throw new Error(`Workout not found with id ${req.params.id}`);
  }

  workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  // Trigger pre-save middleware (ie, slugify)
  await workout.save();

  return res.status(200).json({ success: true, data: workout });
});

// @desc        Delete workout
// @route       DELETE /api/workouts/:id
// @access      Private
exports.deleteWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    res.status(404);
    throw new Error(`Workout not found with id ${req.params.id}`);
  }

  await workout.deleteOne();

  return res.status(200).json({ success: true, data: {} });
});
