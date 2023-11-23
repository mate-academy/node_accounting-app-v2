'use strict';

const express = require('express');
const {
  getUsers,
  createUser,
  getOneUser,
  updateUser,
  removeUser,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/users', express.json(), createUser);
userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getOneUser);
userRouter.patch('/users/:id', express.json(), updateUser);
userRouter.delete('/users/:id', express.json(), removeUser);

module.exports = userRouter;
