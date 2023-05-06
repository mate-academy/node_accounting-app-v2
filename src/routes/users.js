'use strict';

const express = require('express');
const userController = require('../controlles/users.js');

const usersRouter = express.Router();

usersRouter.get('/', userController.getAll);
usersRouter.get('/', userController.getUser);
usersRouter.post('/', userController.postUser);
usersRouter.delete('/:userId', userController.deleteUser);
usersRouter.patch('/:userId', userController.updateUser);

module.exports = {
  usersRouter,
};
