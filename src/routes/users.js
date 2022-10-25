'use strict';

const express = require('express');

const userControler = require('../controllers/users');
const userRouter = express.Router();

userRouter.post('/users', userControler.createUser);
userRouter.get('/users', userControler.getUsers);
userRouter.get('/users/:userId', userControler.getUserID);
userRouter.patch('/users/:userId', userControler.updateUser);
userRouter.delete('/users/:userId', userControler.deleteUser);

module.exports = {
  userRouter,
};
