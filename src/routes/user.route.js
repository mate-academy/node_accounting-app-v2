'use strict';

const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');

userRouter.get('/', userController.get);
userRouter.get('/:id', userController.getOne);
userRouter.post('/', userController.create);
userRouter.delete('/:id', userController.remove);
userRouter.patch('/:id', userController.update);

module.exports = { userRouter };
