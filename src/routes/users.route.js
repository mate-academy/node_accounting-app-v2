'use strict';

const userController = require('../controllers/users.controller');
const express = require('express');
const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getOne);
userRouter.post('/', userController.create);
userRouter.delete('/:id', userController.deleted);
userRouter.patch('/:id', userController.update);

module.exports = {
  userRouter,
};
