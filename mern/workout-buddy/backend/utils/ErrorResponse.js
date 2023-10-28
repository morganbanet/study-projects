class ErrorResponse extends Error {
  constructor(message, statusCode, emptyFields) {
    super(message);
    this.statusCode = statusCode;
    this.emptyFields = emptyFields;
  }
}

module.exports = ErrorResponse;
