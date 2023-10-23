const asyncHandler = require('../middleware/asyncMiddleware');

// @desc        Get workouts
// @route       GET /api/workouts
// @access      Private
exports.getWorkouts = asyncHandler(async (req, res) => {
  return res.status(200).json({ success: true, message: 'Get workouts' });
});

// @desc        Get workout
// @route       GET /api/workouts/:id
// @access      Private
exports.getWorkout = asyncHandler(async (req, res) => {
  return res.status(200).json({ success: true, message: 'Get workout' });
});

// @desc        Create workout
// @route       POST /api/workouts
// @access      Private
exports.createWorkout = asyncHandler(async (req, res) => {
  return res.status(201).json({ success: true, message: 'Create workout' });
});

// @desc        Update workout
// @route       PATCH /api/workouts/:id
// @access      Private
exports.updateWorkout = asyncHandler(async (req, res) => {
  return res.status(200).json({ success: true, message: 'Update workout' });
});

// @desc        Delete workout
// @route       DELETE /api/workouts/:id
// @access      Private
exports.deleteWorkout = asyncHandler(async (req, res) => {
  return res.status(200).json({ success: true, message: 'Delete workout' });
});
