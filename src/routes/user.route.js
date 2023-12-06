'use strict';

const userControllers = require('../controllers/user.controller');

const express = require('express');

const userRouter = express.Router();

userRouter.get('/', userControllers.get);

userRouter.post('/', userControllers.postOne);

userRouter.get('/:id', userControllers.getOneById);

userRouter.delete('/:id', userControllers.deleteOne);

userRouter.patch('/:id', userControllers.changedOne);

module.exports = {
  userRouter,
};
