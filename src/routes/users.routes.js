'use strict';

const express = require('express');
const controller = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/:id', controller.getUser);
usersRouter.get('/', controller.getAllUsers);
usersRouter.post('/', controller.postUser);
usersRouter.patch('/:id', controller.updateUser);
usersRouter.delete('/:id', controller.deleteUser);

module.exports = {
  usersRouter,
};
