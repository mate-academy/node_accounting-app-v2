'use strict';

const express = require('express');
const usersController = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);

usersRouter.post('/', usersController.post);

usersRouter.get('/:id', usersController.getById);

usersRouter.delete('/:id', usersController.remove);

usersRouter.patch('/:id', usersController.update);

module.exports = { usersRouter };
