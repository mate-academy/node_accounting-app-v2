'use strict';

const express = require('express');
const usersRouter = express.Router();
const UsersController = require('../controllers/User.controller');

usersRouter.get('/', UsersController.get);
usersRouter.get('/:id', UsersController.getOne);
usersRouter.post('/', UsersController.create);
usersRouter.patch('/:id', UsersController.update);
usersRouter.delete('/:id', UsersController.remove);

module.exports = {
  usersRouter,
};
