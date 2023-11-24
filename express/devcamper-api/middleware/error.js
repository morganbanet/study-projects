const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Logging for dev
  // console.log(JSON.parse(JSON.stringify(err)));
  console.log(err);

  // Mongoose bad object id
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // JSON Web Token Error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Not authorized to access this resource';
    error = new ErrorResponse(message, 401);
  }

  // JSON Web Token Expired
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired, please sign in again';
    error = new ErrorResponse(message, 401);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server error' });
};

module.exports = errorHandler;
