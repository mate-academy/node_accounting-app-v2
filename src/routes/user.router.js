'use strict';

const express = require('express');
const { userController } = require('../controllers/user.controller.js');

const userRouter = express.Router();

userRouter.get('/', userController.getAll);

userRouter.post('/', express.json(), userController.create);

userRouter.get('/:userId', userController.getById);

userRouter.delete('/:userId', userController.remove);

userRouter.patch('/:userId', express.json(), userController.update);

module.exports = { userRouter };
