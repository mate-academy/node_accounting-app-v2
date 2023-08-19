'use strict';

const express = require('express');
const usersController = require('../controllers/users.js');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:userId', usersController.getUser);
usersRouter.post('/', usersController.createUser);
usersRouter.delete('/:userId', usersController.deleteUser);
usersRouter.patch('/:userId', usersController.updateUser);

module.exports = {
  usersRouter,
};
