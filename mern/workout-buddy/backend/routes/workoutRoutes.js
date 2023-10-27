const express = require('express');

const Workout = require('../models/workoutModel');
const { protect, checkOwnership } = require('../middleware/authMiddleware');

const {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');

const router = express.Router();

// Protect all routes
router.use(protect);

// prettier-ignore
router.route('/')
  .get(getWorkouts)
  .post(createWorkout);

// prettier-ignore
router
  .route('/:id')
  .get(checkOwnership(Workout), getWorkout)
  .patch(checkOwnership(Workout), updateWorkout)
  .delete(checkOwnership(Workout), deleteWorkout)

module.exports = router;
