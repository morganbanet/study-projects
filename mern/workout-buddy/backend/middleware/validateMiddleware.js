const ErrorResponse = require('../utils/ErrorResponse');

exports.validate = (schema) => (req, res, next) => {
  // Validate req.body against schema
  const results = schema.validate(req.body);

  if (results.error) {
    console.log(results.error);
    const message = results.error.details.map((el) => el.message).join(',');
    throw new ErrorResponse(message, 400);
  }

  next();
};
