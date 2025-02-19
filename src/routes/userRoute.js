const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', userController.getAll);

userRouter.post('/', userController.create);

userRouter.get('/:id', userController.get);

userRouter.delete('/:id', userController.remove);

userRouter.patch('/:id', userController.update);

module.exports = { userRouter };
