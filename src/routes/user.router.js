'use strict';

const usersController = require('../controllers/user.constroller');
const express = require('express');
const { Router } = require('express');

const userRouter = Router();

userRouter.get('/:id', usersController.getOne);
userRouter.get('/', usersController.getAll);
userRouter.post('/', express.json())

module.exports = { userRouter };
