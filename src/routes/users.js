'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const route = express.Router();

route.get('/', usersController.getAllUsers);
route.post('/', usersController.addUser);
route.get('/:userId', usersController.getOneUser);
route.delete('/:userId', usersController.deleteUser);
route.patch('/:userId', usersController.updateUser);

module.exports = {
  route,
};
