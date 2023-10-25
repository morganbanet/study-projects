const express = require('express');
const advancedResults = require('../middleware/resultsMiddleware');
const Workout = require('../models/workoutModel');

const {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');

const router = express.Router();

// prettier-ignore
router.route('/')
  .get(advancedResults(Workout), getWorkouts)
  .post(createWorkout);

// prettier-ignore
router.route('/:id')
  .get(getWorkout)
  .patch(updateWorkout)
  .delete(deleteWorkout);

module.exports = router;
