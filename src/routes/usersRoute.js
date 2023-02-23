'use strict';

const userController = require('../controllers/userController');
const express = require('express');

const userRouter = express.Router();

userRouter.get('/', userController.getAll);

userRouter.get('/:userId', userController.getUser);

userRouter.post('/', express.json(), userController.add);

userRouter.delete('/:userId', userController.remove);

userRouter.patch('/:userId', express.json(), userController.update);

module.exports = { userRouter };
