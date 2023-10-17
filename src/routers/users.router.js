'use strict';

const express = require('express');
const {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUserById,
} = require('../controllers/users.controller');
const usersRouter = express.Router();

usersRouter.get('/', getUsers);

usersRouter.get('/:userId', getUser);

usersRouter.post('/', addUser);

usersRouter.delete('/:userId', deleteUser);

usersRouter.patch('/:userId', updateUserById);

module.exports = usersRouter;
