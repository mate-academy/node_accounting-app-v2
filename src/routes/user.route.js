const express = require('express');

const { usersController } = require('../controllers/user.controller');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:id', usersController.getById);
usersRouter.post('/', usersController.createNewUser);
usersRouter.delete('/:id', usersController.removeUser);
usersRouter.patch('/:id', usersController.updateUser);

module.exports = {
  usersRouter,
};
