'use strict';

const express = require('express');
const userController = require('../controllers/users.js');
const usersRouter = express.Router();

usersRouter.get('/', userController.getAll);

usersRouter.get('/:id', userController.getOne);

usersRouter.post('/', userController.add);

usersRouter.delete('/:id', userController.remove);

usersRouter.patch('/:id', userController.update);

module.exports = {
  usersRouter,
};
