'use strict';

const express = require('express');
const { userController } = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/', userController.getAll);

userRouter.post('/', userController.add);

userRouter.get('/:userId', userController.getById);

userRouter.delete('/:userId', userController.remove);

userRouter.patch('/:userId', userController.update);

module.exports = {
  userRouter,
};
