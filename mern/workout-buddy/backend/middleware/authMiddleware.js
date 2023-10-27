const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const asyncHandler = require('../middleware/asyncMiddleware');
const ErrorResponse = require('../utils/ErrorResponse');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from req cookie
  token = req.cookies.jwt;

  // Check token exists
  if (!token) {
    return next(
      new ErrorResponse('Not authorized to access this resource', 401)
    );
  }

  // Verify token signature
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Set user in req object
  req.user = await User.findById(decoded.userId);

  next();
});

// Admin only access
exports.authorize = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next(
      new ErrorResponse('Not authorized to access this resource', 401)
    );
  }

  next();
};

// Check ownership
exports.checkOwnership = (model) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
      // Find resource to modify
      const reqId = req.params.id;
      const resource = await model.findById(reqId);

      console.log(req.params.id);

      // Check resource exists
      if (!resource) {
        return next(
          new ErrorResponse(`Resource not found with id ${reqId}`, 404)
        );
      }

      // Check if owner of resource matches req user
      if (resource.user.toString() !== req.user.id) {
        return next(
          new ErrorResponse(`Not authorized to access this resource`, 403)
        );
      }
    }

    next();
  });
