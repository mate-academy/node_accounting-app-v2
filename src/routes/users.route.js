'use strict';

const express = require('express');
const usersController = require('../controllers/users.controller');

const userRouter = express.Router();

userRouter.get('/', usersController.getAll);

userRouter.get('/:id', usersController.getOne);

userRouter.post('/', usersController.create);

userRouter.patch('/:id', usersController.update);

userRouter.delete('/:id', usersController.remove);

module.exports = {
  userRouter,
};
