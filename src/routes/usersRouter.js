'use strict';

const express = require('express');
const usersController = require('../controller/users');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:id', usersController.getById);
usersRouter.post('/', usersController.create);
usersRouter.delete('/:id', usersController.remove);
usersRouter.patch('/:id', usersController.update);

module.exports = {
  usersRouter,
};
;
