'use strict';

const express = require('express');
const cors = require('cors');
const {
  getUsers,
  getUserById,
  addUser,
  changeUser,
  removeUser,
} = require('../controllers/usersControllers');

const usersRouter = express.Router();

usersRouter.get('/', cors(), getUsers);

usersRouter.get('/:id', getUserById);

usersRouter.post('/', addUser);

usersRouter.put('/:id', changeUser);

usersRouter.delete('/:id', removeUser);

module.exports = {
  usersRouter,
};
