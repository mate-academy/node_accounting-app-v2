'use strict';

const { Router } = require('express');
const userControllers = require('./expenses');
const userRouter = Router();

userRouter.get('/', userControllers.getAll);

userRouter.get('/:userId', userControllers.getUser);

userRouter.patch('/:userId', userControllers.updateUser);

userRouter.delete('/:userId', userControllers.deleteUser);

userRouter.post('/', userControllers.addUser);

module.exports = {
  userRouter,
};
