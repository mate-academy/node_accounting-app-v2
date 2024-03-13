'use strict';

const express = require('express');
const userRouter = express.Router();
const userControllers = require('../controllers/user.controller.js');

userRouter.get('/', userControllers.get);
userRouter.get('/:id', userControllers.getOneUser);
userRouter.post('/', userControllers.addUser);
userRouter.delete('/:id', userControllers.deleteUser);
userRouter.patch('/:id', userControllers.updateOneUser);

module.exports = { userRouter };
