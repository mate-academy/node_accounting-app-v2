'use strict';

const express = require('express');
const userController = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', userController.getAllUsers);

usersRouter.get('/:id', userController.getUserById);

usersRouter.post('/', userController.createUser);

usersRouter.delete('/:id', userController.removeUser);

usersRouter.patch('/:id', userController.updateUser);

module.exports = { usersRouter };
