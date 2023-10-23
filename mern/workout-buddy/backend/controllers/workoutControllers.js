// @desc        Get workouts
// @route       GET /api/workouts
// @access      Private
exports.getWorkouts = (req, res) => {
  return res.status(200).json({ success: true, message: 'Get workouts' });
};

// @desc        Get workout
// @route       GET /api/workouts/:id
// @access      Private
exports.getWorkout = (req, res) => {
  return res.status(200).json({ success: true, message: 'Get workout' });
};

// @desc        Create workout
// @route       POST /api/workouts
// @access      Private
exports.createWorkout = (req, res) => {
  return res.status(201).json({ success: true, message: 'Create workout' });
};

// @desc        Update workout
// @route       PATCH /api/workouts/:id
// @access      Private
exports.updateWorkout = (req, res) => {
  return res.status(200).json({ success: true, message: 'Update workout' });
};

// @desc        Delete workout
// @route       DELETE /api/workouts/:id
// @access      Private
exports.deleteWorkout = (req, res) => {
  return res.status(200).json({ success: true, message: 'Delete workout' });
};
