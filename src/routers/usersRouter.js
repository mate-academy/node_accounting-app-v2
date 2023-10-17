'use strict';

const express = require('express');
const usersController = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.get('/', usersController.get);

usersRouter.post('/', usersController.post);

usersRouter.get('/:id', usersController.getOne);

usersRouter.delete('/:id', usersController.deleteOne);

usersRouter.patch('/:id', usersController.patchOne);

module.exports = { usersRouter };
