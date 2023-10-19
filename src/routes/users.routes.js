'use strict';

const express = require('express');
const usersController = require('../controllers/users.controller');
const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);

usersRouter.get('/:id', usersController.getById);

usersRouter.post('/', usersController.post);

usersRouter.patch('/:id', usersController.patch);

usersRouter.delete('/:id', usersController.remove);

module.exports = { usersRouter };
