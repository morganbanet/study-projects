const notFound = (req, res, next) => {
  const error = new Error(`Not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // If status code 200, then change to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  let emptyFields = [];

  // Loggging for dev
  // console.log(JSON.parse(JSON.stringify(err)));

  // Mongoose bad object id
  if (err.name === 'CastError') {
    message = 'Resource not found';
    statusCode = 404;
  }

  // Mongoose validation
  if (err.name === 'ValidationError') {
    message = 'Missing fields required';
    emptyFields = Object.values(err.errors).map((value) => value.path);
    statusCode = 400;
  }

  resObj = {
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  };

  if (emptyFields && emptyFields.length !== 0) {
    resObj = { message, emptyFields, ...resObj };
  }

  res.status(statusCode).json(resObj);
};

module.exports = { notFound, errorHandler };
