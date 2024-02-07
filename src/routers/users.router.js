'use strict';

const express = require('express');
const { usersController } = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', usersController.get);
usersRouter.get('/:id', usersController.getOne);
usersRouter.post('/', usersController.create);
usersRouter.delete('/:id', usersController.remove);
usersRouter.patch('/:id', usersController.update);

module.exports = {
  usersRouter,
};
