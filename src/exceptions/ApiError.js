'use strict';

class ApiError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
  }

  static BadRequest() {
    return new ApiError(400, 'Bad Request');
  }

  static NotFound() {
    return new ApiError(404, 'Not Found');
  }
}

module.exports = { ApiError };
