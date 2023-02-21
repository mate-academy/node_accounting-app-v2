'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', usersController.getAll);
userRouter.get('/:userId', usersController.getById);
userRouter.post('/', usersController.add);
userRouter.delete('/:userId', usersController.remove);
userRouter.patch('/:userId', usersController.update);

module.exports = userRouter;
