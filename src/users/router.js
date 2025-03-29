const usersController = require('./controller');
const express = require('express');

const usersRouter = express.Router();

usersRouter.get('/users', usersController.getAll);
usersRouter.get('/users/:id', usersController.getUser);
usersRouter.post('/users', express.json(), usersController.addUser);
usersRouter.delete('/users/:id', usersController.removeUser);
usersRouter.patch('/users/:id', express.json(), usersController.updateUser);

module.exports = { usersRouter };
