const userService = require('../services/user.service');

const nameCheck = (name) => {
  if (!name || typeof name !== 'string') {
    return true;
  }
};

const isUserExist = (id) => {
  if (!userService.getById(id)) {
    return true;
  }
};

module.exports = {
  nameCheck,
  isUserExist,
};
