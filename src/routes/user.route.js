const express = require('express');
const userController = require('./../controllers/user.controller');
const userRouter = express.Router();

userRouter.get('/', userController.getAll);

userRouter.post('/', userController.add);

userRouter.get('/:id', userController.get);

userRouter.delete('/:id', userController.remove);

userRouter.patch('/:id', userController.update);

module.exports = { userRouter };
