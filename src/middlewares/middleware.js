'use strict';

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;

  if (err.message === 'Not found') {
    statusCode = 404;
  } else if (err.message === 'Bad request') {
    statusCode = 400;
  }

  res.status(statusCode).send({
    error: err.message || 'Internal Server Error',
  });
};

module.exports = {
  errorHandler,
};
