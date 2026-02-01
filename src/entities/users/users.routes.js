const express = require('express');

const createUserControllers = require('./users.controller');

const createUserRouter = (userService) => {
  const usersRouter = express.Router();

  const { create, getAll, deleteUser, getOne, update } =
    createUserControllers(userService);

  usersRouter.get('/', getAll);
  usersRouter.post('/', create);
  usersRouter.get('/:id', getOne);
  usersRouter.delete('/:id', deleteUser);
  usersRouter.patch('/:id', update);

  return usersRouter;
};

module.exports = createUserRouter;
