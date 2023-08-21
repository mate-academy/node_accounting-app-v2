'use strict';

const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/controllerUsers.js');

userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.getOne);

userRouter.post('/', userController.add);
userRouter.delete('/:userId', userController.remove);
userRouter.patch('/:userId', userController.update);

module.exports = { userRouter };
