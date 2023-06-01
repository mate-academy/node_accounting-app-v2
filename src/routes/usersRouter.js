'use strict';

const express = require('express');

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  changeUserById,
} = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/:userId', changeUserById);
usersRouter.delete('/:userId', deleteUserById);

module.exports = usersRouter;
