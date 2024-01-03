'use strict';

const userController = require('../controllers/user.controller');

const express = require('express');

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get('/', userController.get);
userRouter.get('/:id', userController.getOneById);
userRouter.post('/', userController.postOne);
userRouter.delete('/:id', userController.deleteOne);
userRouter.patch('/:id', userController.updateOne);

module.exports = {
  userRouter,
};
