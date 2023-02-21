'use strict';

const userController = require('../controllers/usersController');
const express = require('express');

const userRouter = express.Router();

userRouter.get('/', userController.getAll);

userRouter.get('/:userId', userController.getUserId);

userRouter.post('/', express.json(), userController.addUser);

userRouter.delete('/:userId', userController.deleteUser);

userRouter.patch('/:userId', express.json(), userController.updateUser);

module.exports = { userRouter };
