const userService = require('../services/user.service');

const nameCheck = (name, res) => {
  if (!name || typeof name !== 'string') {
    res
      .status(400)
      .send('Invalid request: "name" is required and must be a string.');

    return true;
  }
};

const isUserExist = (id, res) => {
  if (!userService.getById(id)) {
    res.status(404).send('User with this id not found');

    return true;
  }
};

module.exports = {
  nameCheck,
  isUserExist,
};
