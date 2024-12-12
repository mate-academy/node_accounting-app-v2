const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', userController.getAll);

userRouter.get('/:id', userController.getUser);

userRouter.post('/', userController.createUser);

userRouter.delete('/:id', userController.removeUser);

userRouter.patch('/:id', userController.updateUser);

module.exports = {
  userRouter,
};
