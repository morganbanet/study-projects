const express = require('express');

const {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutControllers');

const router = express.Router();

// prettier-ignore
router.route('/')
  .get(getWorkouts)
  .post(createWorkout);

// prettier-ignore
router.route('/:id')
  .get(getWorkout)
  .patch(updateWorkout)
  .delete(deleteWorkout);

module.exports = router;
