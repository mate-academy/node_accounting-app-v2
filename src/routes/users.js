'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', usersController.getAll);

userRouter.get('/:id', usersController.getOne);

userRouter.post('/', usersController.add);

userRouter.delete('/:id', usersController.remove);

userRouter.patch('/:id', usersController.update);

module.exports = userRouter;
