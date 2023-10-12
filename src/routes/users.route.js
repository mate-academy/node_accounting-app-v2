'use strict';

const express = require('express');
const userController = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', userController.get);

usersRouter.post('/', userController.create);

usersRouter.get('/:id', userController.getOne);

usersRouter.delete('/:id', userController.deleteOne);

usersRouter.patch('/:id', userController.update);

module.exports = {
  usersRouter,
};
