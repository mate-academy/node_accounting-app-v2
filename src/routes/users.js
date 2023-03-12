'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:userId', usersController.getOne);
usersRouter.post('/', usersController.addNewUser);
usersRouter.delete('/:userId', usersController.deleteUser);
usersRouter.patch('/:userId', usersController.updateUser);

module.exports = usersRouter;
