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
usersRouter.post('/', express.json(), createOne);
usersRouter.delete('/:userId', removeUser);
usersRouter.patch('/:userId', express.json(), updateOne);

module.exports = usersRouter;
