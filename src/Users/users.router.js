'use strict';

const express = require('express');
const { usersService } = require('./users.service');

const usersRouter = express.Router();

usersRouter.get('/', usersService.getAllUsers);
usersRouter.get('/:id', usersService.getUser);
usersRouter.post('/', usersService.postUser);
usersRouter.patch('/:id', usersService.patchUser);
usersRouter.delete('/:id', usersService.deleteUser);

module.exports = {
  usersRouter,
};
