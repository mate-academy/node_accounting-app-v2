const express = require('express');

const userController = require('../controllers/users.controller.js');

module.exports = function (users) {
  const usersRouter = express.Router();

  usersRouter.get('/', userController.getAllUsers(users));
  usersRouter.post('/', userController.postUsers(users));
  usersRouter.get('/:id', userController.getUserById(users));
  usersRouter.delete('/:id', userController.deleteUser(users));
  usersRouter.patch('/:id', userController.patchUsers(users));

  return usersRouter;
};
