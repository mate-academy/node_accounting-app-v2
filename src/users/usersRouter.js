'use strict';

const express = require('express');
const { usersController } = require('./usersController');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUserbyId);
usersRouter.post('/', usersController.createUser);
usersRouter.patch('/:id', usersController.updateUser);
usersRouter.delete('/:id', usersController.deleteUser);

module.exports = {
  usersRouter,
};
