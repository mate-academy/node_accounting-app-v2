'use strict';

const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId', userController.getUserById);

userRouter.post('/', userController.createUser);

userRouter.delete('/:userId', userController.deleteUser);

userRouter.patch('/:userId', userController.updateUser);

module.exports = {
  userRouter,
};
