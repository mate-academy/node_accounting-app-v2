'use strict';

const { Router } = require('express');

function createUsersRouter(usersController) {
  const usersRouter = Router();

  usersRouter.get('/', usersController.getUsers);
  usersRouter.get('/:id', usersController.getUserById);
  usersRouter.post('/', usersController.createUser);
  usersRouter.patch('/:id', usersController.updateUser);
  usersRouter.delete('/:id', usersController.deleteUser);

  return usersRouter;
}

module.exports = {
  createUsersRouter,
};
