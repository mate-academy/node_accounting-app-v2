'use strict';

const express = require('express');
const usersRouter = express.Router();
const controller = require('../Controllers/users.controller');

usersRouter.get('/', controller.getAllUsers);
usersRouter.post('/', controller.postUser);
usersRouter.get('/:id', controller.getUser);
usersRouter.delete('/:id', controller.deleteUser);
usersRouter.patch('/:id', controller.updateUser);

module.exports = {
  usersRouter,
};
