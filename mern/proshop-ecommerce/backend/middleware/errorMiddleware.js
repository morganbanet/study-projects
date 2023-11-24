const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // If status code is 200, force it to be 500 instead
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Logging for dev
  // console.log(JSON.stringify(JSON.parse(err)));
  console.log(err);

  // Check for bad object id
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = `Resource not found`;
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export { notFound, errorHandler };
