'use strict';

const { ApiError } = require('../exceptions/ApiError');
const { ValidationError } = require('../exceptions/ValidationError');

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof ApiError) {
    const { status, message } = error;

    return res.status(status).send(message);
  }

  if (error instanceof ValidationError) {
    return res.status(400).send(error.message);
  }

  res.status(500).send('Unexpected Error');
};

module.exports = { errorMiddleware };
