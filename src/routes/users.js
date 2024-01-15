'use strict';

const express = require('express');
const {
  getAllUsers,
  getOneUser,
  addUser,
  removeUser,
  updateUser,
} = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getOneUser);
usersRouter.post('/', addUser);
usersRouter.delete('/:userId', removeUser);
usersRouter.patch('/:userId', updateUser);

module.exports = {
  usersRouter,
};
