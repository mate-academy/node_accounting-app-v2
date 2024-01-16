'use strict';

const express = require('express');
const userRouter = express.Router();
const { getUser,
  getUsers,
  addUser,
  patchUser,
  deleteUser } = require('../constrolers/users.controlers');

userRouter.get('/', getUsers);

userRouter.post('/', express.json(), addUser);

userRouter.get('/:id', getUser);

userRouter.patch('/:id', express.json(), patchUser);

userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
