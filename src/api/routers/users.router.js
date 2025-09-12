const express = require('express');
const { usersController } = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/users/:id', usersController.get);
usersRouter.get('/users', usersController.getAll);
usersRouter.post('/users', usersController.create);
usersRouter.delete('/users/:id', usersController.remove);
usersRouter.patch('/users/:id', usersController.update);

module.exports = usersRouter;
