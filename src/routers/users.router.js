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

usersRouter.get('/:id', getUser);

usersRouter.post('/', addUser);

usersRouter.delete('/:id', deleteUser);

usersRouter.patch('/:id', updateUserById);

module.exports = usersRouter;
