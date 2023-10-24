'use strict';

const express = require('express');
const usersRouter = express.Router();
const { usersController } = require('./users.controller');

usersRouter.get('/', usersController.getAllUsers);

usersRouter.post('/', usersController.addNextUser);

usersRouter.delete('/:userId', usersController.deleteUser);

usersRouter.get('/:userId', usersController.getOneUser);

usersRouter.put('/:userId', usersController.userToUpdate);

module.exports = { usersRouter };
