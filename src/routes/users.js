'use strict';

const express = require('express');
const {
  getAllUsers,
  getOneUser,
  addUser,
  remove,
  update,
} = require('../controllers/users.js');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.get('/:userId', getOneUser);

usersRouter.post('/', express.json(), addUser);

usersRouter.delete('/:userId', remove);

usersRouter.patch('/:userId', express.json(), update);

module.exports = { usersRouter };
