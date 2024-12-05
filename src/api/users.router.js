const { Router } = require('express');
const { usersController } = require('./users.controller.js');

const usersRouter = Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.post('/', usersController.createUser);
usersRouter.delete('/:id', usersController.deleteUserById);
usersRouter.patch('/:id', usersController.updateUserById);

module.exports = {
  usersRouter,
};
