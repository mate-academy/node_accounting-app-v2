'use strict';

const express = require('express');
const userControllers = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.get('/', userControllers.getAll);
userRouter.get('/:userId', userControllers.findById);
userRouter.post('/', express.json(), userControllers.create);
userRouter.delete('/:userId', userControllers.remove);
userRouter.patch('/:userId', express.json(), userControllers.update);

module.exports = {
  userRouter,
};
