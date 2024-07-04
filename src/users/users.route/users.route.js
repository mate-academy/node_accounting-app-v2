const express = require('express');
const usersRoute = express.Router();
const { getUsers } = require('../users.controller/users.controller');

usersRoute.get('/', getUsers());

module.exports = {
  usersRoute,
};
