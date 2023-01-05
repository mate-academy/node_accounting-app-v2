'use strict';

const usersController = require('../controllers/users');
const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:userId', usersController.getUserById);
usersRouter.post('/', usersController.addNewUser);
usersRouter.delete('/:userId', usersController.deleteUserById);
usersRouter.put('/:userId', usersController.updateUserById);

module.exports = {
  usersRouter,
};
