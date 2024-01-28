'use strict';

const express = require('express');
const userController = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/', userController.get);
userRouter.post('/', userController.create);
userRouter.get('/:id', userController.getById);
userRouter.delete('/:id', userController.remove);
userRouter.patch('/:id', userController.update);

module.exports = { userRouter };
