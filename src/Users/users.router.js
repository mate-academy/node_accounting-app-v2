'use strict';

const express = require('express');
const { usersController } = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUser);
usersRouter.post('/', usersController.postUser);
usersRouter.patch('/:id', usersController.patchUser);
usersRouter.delete('/:id', usersController.deleteUser);

module.exports = {
  usersRouter,
};
