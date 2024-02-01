'use strict';

const express = require('express');
const {
  getOne,
  getAll,
  add,
  remove,
  update,
} = require('../controllers/users.js');

const usersRouter = express.Router();

usersRouter.get('/', getAll);
usersRouter.get('/:userId', getOne);
usersRouter.post('/', express.json(), add);
usersRouter.delete('/:userId', remove);
usersRouter.patch('/:userId', express.json(), update);

module.exports = {
  usersRouter,
};
