'use strict';

const userServices = require('../services/users');

const getAllUsers = (req, res) => {
  const users = userServices.getUsers();

  res.statusCode = 200;
  res.send(users);
};

module.exports = {
  getAllUsers,
};
