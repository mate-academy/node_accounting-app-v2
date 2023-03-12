'use strict';

const express = require('express');
const { usersControllers } = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', usersControllers.getAll);

userRouter.get('/:userId', usersControllers.getUserById);

userRouter.post('/', express.json(), usersControllers.addUser);

userRouter.delete('/:userId', usersControllers.deleteUser);

userRouter.patch('/:userId', express.json(), usersControllers.updateUser);

module.exports = userRouter;
