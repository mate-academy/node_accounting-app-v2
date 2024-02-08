'use strict';

const express = require('express');
const usersRouter = express.Router();

const {
  getAllUsers,
  postNewUser,
  getUserById,
  removeUser,
  updateUserInfo,
} = require('./usersControllers');

// USERS ROUTES
usersRouter.get('/', getAllUsers);
usersRouter.post('/', postNewUser);
usersRouter.get('/:id', getUserById);
usersRouter.delete('/:id', removeUser);
usersRouter.patch('/:id', updateUserInfo);

module.exports = usersRouter;
