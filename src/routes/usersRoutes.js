'use strict';

const express = require('express');
const usersRouter = express.Router();

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  removeUser,
} = require('../controlers/users');

usersRouter.get('/', getAll);
usersRouter.get('/:userId', getOne);
usersRouter.post('/', createOne);
usersRouter.delete('/:userId', removeUser);
usersRouter.patch('/:userId', updateOne);

module.exports = usersRouter;
