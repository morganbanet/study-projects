const express = require('express');

// Controller imports
const {
  getBootcamps,
  getBootcamp,
  getBootcampsInRadius,
  createBootcamp,
  updateBootcamp,
  UploadBootcampPhoto,
  deleteBootcamp,
} = require('../controllers/bootcamps');

const courseRouter = require('./courses');
const reviewRouter = require('./reviews');
const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize, checkOwnership } = require('../middleware/auth');

router = express.Router();

router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
  .route('/:id/photo')
  .put(
    protect,
    authorize('publisher', 'admin'),
    checkOwnership(Bootcamp),
    UploadBootcampPhoto
  );

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(
    protect,
    authorize('publisher', 'admin'),
    checkOwnership(Bootcamp),
    updateBootcamp
  )
  .delete(
    protect,
    authorize('publisher', 'admin'),
    checkOwnership(Bootcamp),
    deleteBootcamp
  );

module.exports = router;
