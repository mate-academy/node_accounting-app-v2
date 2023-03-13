'use strict';

class ValidationError extends Error {
  static IncorrectType() {
    return new ValidationError('Incorrect data type for this request');
  };

  static MissingData() {
    return new ValidationError('Missing required data for this request');
  }
}

module.exports = { ValidationError };
