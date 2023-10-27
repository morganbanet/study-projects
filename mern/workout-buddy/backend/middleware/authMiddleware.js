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
