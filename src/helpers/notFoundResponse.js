'use strict';

const notFoundResponse = (res) => {
  return res
    .status(404)
    .json({
      error: 'User not found',
    });
};

module.exports = { notFoundResponse };
