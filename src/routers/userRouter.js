'use strict';

const express = require('express');

const {
  getAllUsersController,
  getOneUserController,
  createUserController,
  removeUserController,
  updateUserController,
} = require('../controllers/userController');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsersController);
usersRouter.get('/:id', getOneUserController);
usersRouter.post('/', createUserController);
usersRouter.delete('/:id', removeUserController);
usersRouter.patch('/:id', updateUserController);

module.exports = {
  usersRouter,
};
