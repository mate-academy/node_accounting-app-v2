'use strict';

const express = require('express');
const usersRouter = express.Router();
const { usersController } = require('./users.controller');

usersRouter.get('/', usersController.getAll);
usersRouter.post('/', usersController.create);
usersRouter.get('/:userId', usersController.getById);
usersRouter.patch('/:userId', usersController.update);
usersRouter.delete('/:userId', usersController.delete);

module.exports = { usersRouter };
