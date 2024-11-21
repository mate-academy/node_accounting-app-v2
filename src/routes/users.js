'use strict';

const express = require('express');

const usersControllers = require('../controllers/users');
const usersRouter = express.Router();

usersRouter.get('/', usersControllers.getAllUsers);

usersRouter.get('/:userId', usersControllers.getOneUser);

usersRouter.post('/', express.json(), usersControllers.addUser);

usersRouter.delete('/:userId', usersControllers.removeUser);

usersRouter.patch('/:userId', usersControllers.updateUser);

module.exports = { usersRouter };
