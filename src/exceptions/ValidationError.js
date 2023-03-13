'use strict';

class ValidationError extends Error {
  static IncorrectType() {
    return new ValidationError('Incorrect data type');
  };

  static RequiredProperty() {
    return new ValidationError('Missing required property');
  }
}

module.exports = { ValidationError };
