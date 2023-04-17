'use strict';

const express = require('express');
const usersControllers = require('./usersControllers');

const usersRouter = express.Router();

usersRouter.get('/', usersControllers.getAllUsers);
usersRouter.post('/', usersControllers.addUser);
usersRouter.get('/:userId', usersControllers.getOneUser);
usersRouter.delete('/:userId', usersControllers.deleteUser);
usersRouter.patch('/:userId', usersControllers.updateUser);

module.exports = {
  usersRouter,
};
