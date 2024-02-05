'use strict';

const { Router } = require('express');
const userController = require('../controllers/user.controller');
const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.postUser);
userRouter.get('/:id', userController.getUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.patch('/:id', userController.updateUser);

module.exports = { userRouter };
