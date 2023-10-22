'use strict';

const express = require('express');
const usersController = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.post('/', usersController.postUser);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.patch('/:id', usersController.updateUser);

module.exports = { usersRouter };
