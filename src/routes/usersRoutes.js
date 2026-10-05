const createUsersRoutes = (usersController) => {
  const express = require('express');
  const usersRoutes = express.Router();

  usersRoutes.get('/', usersController.getUsers);
  usersRoutes.get('/:id', usersController.getUserById);
  usersRoutes.post('/', usersController.postUser);
  usersRoutes.patch('/:id', usersController.patchUser);
  usersRoutes.delete('/:id', usersController.deleteUser);

  return usersRoutes;
};

module.exports = {
  createUsersRoutes,
};
