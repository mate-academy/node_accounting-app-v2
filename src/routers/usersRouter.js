'use strict';

const express = require('express');

const usersControllers = require('../controllers/users_controllers');
const usersRouter = express.Router();

usersRouter.get('/', usersControllers.getAllUsers);

usersRouter.post('/', usersControllers.addUser);

usersRouter.get('/:id', usersControllers.getUserById);

usersRouter.delete('/:id', usersControllers.removeUser);

usersRouter.patch('/:id', usersControllers.updateUser);

module.exports = { usersRouter };
