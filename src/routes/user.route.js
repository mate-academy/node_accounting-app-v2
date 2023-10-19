'use strict';

const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/user.controller');

// userRouter.patch('/users/:id', userController.update);

// userRouter.get('/users', userController.get);

// userRouter.get('/users/:id', userController.getOne);

// userRouter.delete('/users/:id', userController.remove);

// userRouter.post('/users', userController.create);

userRouter.patch('/:id', userController.update);

userRouter.get('/', userController.get);

userRouter.get('/:id', userController.getOne);

userRouter.delete('/:id', userController.remove);

userRouter.post('/', userController.create);

module.exports = {
  userRouter,
};
