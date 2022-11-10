'use strict';

const express = require('express');
const {
  createUser,
  getUsers,
  getUserById,
  editUser,
  deleteUser,
} = require('../controllers/userControllers');
const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.patch('/:id', editUser);
usersRouter.delete('/:id', deleteUser);

module.exports = { usersRouter };
