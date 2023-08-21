'use strict';

const express = require('express');
const userController = require('../controllers/users.js');
const userRouter = express.Router();

userRouter.post('/', userController.createNewUser);

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId', userController.getUserById);

userRouter.patch('/:userId', userController.updateUser);

userRouter.delete('/:userId', userController.deleteUser);

module.exports = {
  userRouter,
};
