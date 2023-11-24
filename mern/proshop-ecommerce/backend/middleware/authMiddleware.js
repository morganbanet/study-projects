import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized to access this resource');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
    throw new Error('Not authorized to access this resource');
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not authorized to access this resource');
  }

  next();
};

export { protect, admin };
