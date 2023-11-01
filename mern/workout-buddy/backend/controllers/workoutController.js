const { cloudinary } = require('../services/cloudinary');
const asyncHandler = require('../utils/asyncHandler');
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

  // Save each image url & filename to db
  if (req.files) {
    req.body.images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
  }

  const workout = await Workout.create(req.body);

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

  // Append images to current images & save urls to db
  if (req.files) {
    let imagesToUpload = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));

    req.body.images = workout.images;
    req.body.images.push(...imagesToUpload);
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

  const filenames = workout.images.map((image) => image.filename);

  // Delete each image from Cloudinary
  filenames.forEach(async (file) => {
    await cloudinary.uploader.destroy(file);
  });

  await workout.deleteOne();

  return res.status(200).json({ success: true, data: {} });
});

// @desc        Upload workout images
// @route       DELETE /api/workouts/:id/images
// @access      Private
exports.UploadWorkoutImages = asyncHandler(async (req, res, next) => {
  let workout = await Workout.findById(req.params.id);

  if (!workout) {
    return next(
      new ErrorResponse(`Workout not found with id ${req.params.id}`)
    );
  }

  // Get url and filename of each image
  let reqImages = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));

  // Append onto current images
  const images = workout.images;
  images.push(...reqImages);

  // prettier-ignore
  workout = await Workout.findByIdAndUpdate(req.params.id, { images }, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({ success: true, data: workout });
});
