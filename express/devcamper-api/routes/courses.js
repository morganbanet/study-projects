const express = require('express');

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses');

const Bootcamp = require('../models/Bootcamp');
const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize, checkOwnership } = require('../middleware/auth');

router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  )
  .post(
    protect,
    authorize('publisher', 'admin'),
    checkOwnership(Bootcamp),
    createCourse
  );

router
  .route('/:id')
  .get(getCourse)
  .put(
    protect,
    authorize('publisher', 'admin'),
    checkOwnership(Course),
    updateCourse
  )
  .delete(
    protect,
    authorize('publisher', 'admin'),
    checkOwnership(Course),
    deleteCourse
  );

module.exports = router;
