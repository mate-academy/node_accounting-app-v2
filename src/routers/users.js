'use strict';

const express = require('express');
const usersController = require('../controllers/users.js');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:userId', usersController.getUser);
usersRouter.delete('/:userId', usersController.deleteUser);
usersRouter.post('/', usersController.addUser);
usersRouter.patch('/:userId', usersController.updateUser);

module.exports = { usersRouter };
