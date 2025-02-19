const userService = require('../services/user.service');

const nameCheck = (name, res) => {
  if (!name || typeof name !== 'string') {
    res.status(400).send('Name is required and must be a string');

    return true;
  }
};

const isUserExist = (id, res) => {
  const user = userService.getUserById(id);

  if (!user) {
    res.status(404).send('User not found');

    return true;
  }
};

module.exports = {
  nameCheck,
  isUserExist,
};
