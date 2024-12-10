const usersServices = require('../services/users/users.services');

const isUserExist = (userId) => {
  return !isNaN(userId) && !!usersServices.getUserById(userId);
};

module.exports = { isUserExist };
