'use strict';

const express = require('express');
const { get, getOnce, create, updateUser, removeUser }
 = require('../controllers/userControllers');
const userRouter = express.Router();

userRouter.get('/users', get());
userRouter.get('/users/:id', getOnce());
userRouter.post('/users', express.json(), create());
userRouter.patch('/users/:id', express.json(), updateUser());
userRouter.delete('/users/:id', removeUser());

module.exports = {
  userRouter,
};
