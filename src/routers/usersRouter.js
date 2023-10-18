'use strict';

const express = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = express.Router();

usersRouter.get('/', usersController.getUsers);

usersRouter.get('/:id', usersController.getUser);

usersRouter.post('/', usersController.createUser);

usersRouter.patch('/:id', usersController.updateUser);

usersRouter.delete('/:id', usersController.deleteUser);

module.exports = usersRouter;
