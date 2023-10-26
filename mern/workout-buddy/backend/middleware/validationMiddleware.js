const { validationResult } = require('express-validator');

const checkSchemaResults = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Fields require attention',
      errors: errors.array(),
    });
  }

  next();
};

module.exports = checkSchemaResults;
