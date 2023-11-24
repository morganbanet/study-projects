const express = require('express');

const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews');

const Review = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize, checkOwnership } = require('../middleware/auth');

router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), createReview);

router
  .route('/:id')
  .get(getReview)
  .put(
    protect,
    authorize('user', 'admin'),
    checkOwnership(Review),
    updateReview
  )
  .delete(
    protect,
    authorize('user', 'admin'),
    checkOwnership(Review),
    deleteReview
  );

module.exports = router;
