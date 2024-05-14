'use strict';

const express = require('express');

const userControllers = require('../controllers/user.controllers');

const userRouter = express.Router();

userRouter.get('/', userControllers.getAllUsers);

userRouter.get('/:id', userControllers.getOneUser);

userRouter.post('/', userControllers.createUser);

userRouter.delete('/:id', userControllers.removeUser);

userRouter.patch('/:id', userControllers.updateUser);

module.exports = {
  userRouter,
};
