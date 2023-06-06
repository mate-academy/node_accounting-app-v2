'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:userId', usersController.getOneUser);
usersRouter.post('/', usersController.addUser);
usersRouter.delete('/:userId', usersController.removeUser);
usersRouter.patch('/:userId', usersController.updateUser);

module.exports = { usersRouter };
