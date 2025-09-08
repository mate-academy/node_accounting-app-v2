const express = require('express');
const { usersController } = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/users', usersController.getAll);
usersRouter.post('/users', usersController.create);
usersRouter.get('/users/:id', usersController.getById);
usersRouter.delete('/users/:id', usersController.deleteUser);
usersRouter.patch('/users/:id', usersController.updateUser);

module.exports = usersRouter;
