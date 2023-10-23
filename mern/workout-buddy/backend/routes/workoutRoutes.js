const express = require('express');

const {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutControllers');

const router = express.Router();

router.route('/').get(getWorkouts).post(createWorkout);

router.route('/:id').get(getWorkout).patch(updateWorkout).delete(deleteWorkout);

module.exports = router;
