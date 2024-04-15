'use strict';

const express = require('express');
const controller = require('../controllers/users.constrollers');
const usersRouter = express.Router();

usersRouter.get('/', controller.getAll);

usersRouter.post('/', controller.addUser);

usersRouter.get('/:id', controller.getUser);

usersRouter.delete('/:id', controller.removeUser);

usersRouter.patch('/:id', controller.updateUser);

module.exports = {
  usersRouter,
};
