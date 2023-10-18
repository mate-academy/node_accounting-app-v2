'use strict';

const express = require('express');
const usersController = require('../controllers/users.controller');
const usersRouter = express.Router();

usersRouter.get('/', usersController.get);

usersRouter.get('/:id', usersController.getOne);

usersRouter.post('/', usersController.post);

usersRouter.patch('/:id', usersController.patch);

usersRouter.delete('/:id', usersController.remove);

module.exports = { usersRouter };
