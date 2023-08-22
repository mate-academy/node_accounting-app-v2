'use strict';

const express = require('express');
const { userController } = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.get('/', userController.getUsers);
usersRouter.get('/:userId', userController.getUser);
usersRouter.post('/', express.json(), userController.createUser);
usersRouter.delete('/:userId', userController.deleteUser);
usersRouter.patch('/:userId', express.json(), userController.updateUser);

module.exports = { usersRouter };
