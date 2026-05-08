const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/users.controller');

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.post('/', usersController.createUser);
usersRouter.delete('/:id', usersController.removeUser);
usersRouter.patch('/:id', usersController.updateUser);

module.exports = usersRouter;
