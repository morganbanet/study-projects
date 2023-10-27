const ErrorResponse = require('../utils/ErrorResponse');

const notFound = (req, res, next) => {
  const error = new Error(`Not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  let emptyFields = [];

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
    const message = 'Fields require attention';
    error = new ErrorResponse(message, 400);
    emptyFields = Object.values(err.errors).map((value) => value.path);
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
    emptyFields,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

module.exports = { notFound, errorHandler };
