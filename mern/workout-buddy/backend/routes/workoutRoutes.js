const express = require('express');
const storage = require('../services/cloudinary');
const multer = require('multer');

const Workout = require('../models/workoutModel');
const { protect, checkOwnership } = require('../middleware/authMiddleware');

const {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  UploadWorkoutImages,
} = require('../controllers/workoutController');

const router = express.Router();

// Note to self: Files stored under the key "image" for createWorkout,
// which matches the input name of the form.
// If uploading multiple files in the client, use "array" in place of
// "single" and access via "req.files" instead of "req.file".
const upload = multer({ storage });

// Protect all routes
router.use(protect);

// prettier-ignore
router
  .route('/')
  .get(getWorkouts)
  .post(upload.array('images'), createWorkout);

// prettier-ignore
router
  .route('/:id')
  .get(checkOwnership(Workout), getWorkout)
  .patch(checkOwnership(Workout), upload.array('images'), updateWorkout)
  .delete(checkOwnership(Workout), deleteWorkout)

// prettier-ignore
router
  .route('/:id/images')
  .patch(checkOwnership(Workout), upload.array('images'), UploadWorkoutImages)

module.exports = router;
