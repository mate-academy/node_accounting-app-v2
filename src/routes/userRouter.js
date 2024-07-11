const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/user.controller');

userRouter.get('/', userController.getUsersController);

userRouter.get('/:id', userController.getOneUserController);

userRouter.post('/', userController.addUserController);

userRouter.patch('/:id', userController.updateUserController);

userRouter.delete('/:id', userController.deleteUserController);

module.exports = userRouter;
