'use strict';

const userController = require('../controllers/users');
const express = require('express');

const userRouter = express.Router();

userRouter.get('/users', userController.getAll);

userRouter.get('/users/:userId', userController.getUserId);

userRouter.post('/users', express.json(), userController.addUser);

userRouter.delete('/users/:userId', userController.deleteUser);

userRouter.put('/users:userId', express.json(), userController.updateUser);

module.exports = userRouter;
