'use strict';

const userControllers = require('../controllers/user.controller');

const express = require('express');

const userRouter = express.Router();

userRouter.get('/', express.json(), userControllers.get);

userRouter.post('/', express.json(), userControllers.postOne);

userRouter.get('/:id', express.json(), userControllers.getOneById);

userRouter.delete('/:id', express.json(), userControllers.deleteOne);

userRouter.patch('/:id', express.json(), userControllers.changedOne);

module.exports = {
  userRouter,
};
