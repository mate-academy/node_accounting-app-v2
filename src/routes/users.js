'use strict';

const express = require('express');

const userController = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.createUser);
userRouter.get('/:userId', userController.getUserById);
userRouter.delete('/:userId', userController.removeUser);
userRouter.patch('/:userId', userController.updateUser);

module.exports = ({ userRouter });
