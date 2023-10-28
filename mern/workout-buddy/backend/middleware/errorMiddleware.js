const ErrorResponse = require('../utils/ErrorResponse');

const notFound = (req, res, next) => {
  const error = new Error(`Not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Loggging for dev
  // console.log(JSON.parse(JSON.stringify(err)));
  // console.log(err);

  // Mongoose bad object id
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((value) => value.path);
    error = new ErrorResponse(message, 400);
  }

  // JSON Web Token error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Not authorized to access this resource';
    error = new ErrorResponse(message, 401);
  }

  // JSON Web Token expired
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired, please sign in again';
    error = new ErrorResponse(message, 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
    emptyFields: error.emptyFields || undefined,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

module.exports = { notFound, errorHandler };
