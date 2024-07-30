'use strict';

const express = require('express');
const usersController = require('../controllers/users.controller.js');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);

usersRouter.post('/', usersController.createUser);

usersRouter.get('/:id', usersController.getOne);

usersRouter.delete('/:id', usersController.remove);

usersRouter.patch('/:id', usersController.update);

module.exports = { usersRouter };
