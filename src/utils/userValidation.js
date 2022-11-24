'use strict';

const { getUserById } = require('../sevices/users');

const isUserExists = (userId) => {
  const foundUser = getUserById(userId);

  return !foundUser;
};

module.exports = {
  isUserExists,
};
