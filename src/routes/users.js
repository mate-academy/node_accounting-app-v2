'use strict';

const express = require('express');
const { usersController } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/users', usersController.getAll);
usersRouter.get('/users/:userId', usersController.getById);
usersRouter.post('/users', express.json(), usersController.add);
usersRouter.delete('/users/:userId', usersController.remove);
usersRouter.patch('/users/:userId', express.json(), usersController.update);

module.exports = usersRouter;
