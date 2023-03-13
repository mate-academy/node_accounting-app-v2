'use strict';

const express = require('express');
const userController = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.getOne);
userRouter.post('/', userController.createOne);
userRouter.patch('/:userId', userController.updateOne);
userRouter.delete('/:userId', userController.deleteOne);

module.exports = userRouter;
