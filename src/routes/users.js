'use strict';

const express = require('express');
const userController = require('../controllers/users');
const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.getOne);
userRouter.post('/', express.json(), userController.add);
userRouter.patch('/:userId', express.json(), userController.update);
userRouter.delete('/:userId', userController.remove);

module.exports = { userRouter };
