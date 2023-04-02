'use strict';

const {
  usersController,
} = require('../controller/usersController');

const express = require('express');
const { usersService } = require('../services/users');

// #region usersRouter
const usersRouter = express.Router();

function users(app) {
  app.use('/users', usersRouter);
  usersService.setInitialUsers();
  usersRouter.get('/', usersController.getUsers);
  usersRouter.get('/:userId', usersController.getUser);
  usersRouter.post('/', usersController.postUser);
  usersRouter.patch('/:userId', usersController.patchUser);
  usersRouter.delete('/:userId', usersController.removeUser);
}
// #endregion

module.exports = {
  users,
};
