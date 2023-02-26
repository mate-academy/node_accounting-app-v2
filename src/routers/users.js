'use strict';

const express = require('express');
const userController = require('../controllers/user');
const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.getById);
userRouter.post('/', express.json(), userController.createUser);
userRouter.patch('/:userId', express.json(), userController.update);
userRouter.delete('/:userId', userController.remove);

module.exports = { userRouter };
