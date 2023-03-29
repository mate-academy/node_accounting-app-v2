'use strict';

const express = require('express');
const usersRouter = express.Router();

const usersController = require('../controllers/users');

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:userId', usersController.getUser);
usersRouter.post('/', usersController.addUser);
usersRouter.patch('/:userId', usersController.editUser);
usersRouter.delete('/:userId', usersController.deleteUser);

module.exports = {
  usersRouter,
};
