'use strict';

const express = require('express');
const usersRouter = express.Router();
const { usersController } = require('./users.controller');

usersRouter.get('/users', usersController.getAllUsers);

usersRouter.post('/users', usersController.addNextUser);

usersRouter.delete('/users/:userId', usersController.deleteUser);

usersRouter.get('/users/:userId', usersController.getOneUser);

usersRouter.put('/users/:userId', usersController.userToUpdate);

module.exports = { usersRouter };
