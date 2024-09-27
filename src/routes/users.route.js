'use strict';

const express = require('express');
const usersRouter = express.Router();
const usersControllers = require('../controllers/users.controller');

usersRouter.get('/', usersControllers.getAllUsers);
usersRouter.post('/', usersControllers.addUser);
usersRouter.get('/:userId', usersControllers.getCurrentUser);
usersRouter.delete('/:userId', usersControllers.removeUser);
usersRouter.patch('/:userId', usersControllers.updateUser);

module.exports = { usersRouter };
