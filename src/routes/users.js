'use strict';

const userController = require('../controllers/users');

const express = require('express');

const usersRouter = express.Router();

usersRouter.post('/users', express.json(), userController.create);

usersRouter.get('/users', userController.getAll);

usersRouter.get('/users/:userId', userController.getOne);

usersRouter.delete('/users/:userId', userController.remove);

usersRouter.patch('/users/:userId', express.json(), userController.update);

module.exports = usersRouter;
