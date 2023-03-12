'use strict';

const express = require('express');
const { usersController } = require('../controller/usersController');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', express.json(), usersController.addUser);
usersRouter.get('/:userId', usersController.getUser);
usersRouter.delete('/:userId', usersController.deleteUser);
usersRouter.patch('/:userId', express.json(), usersController.updateUser);

module.exports = {
  usersRouter,
};
