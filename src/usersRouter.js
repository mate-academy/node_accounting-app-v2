'use strict';

const express = require('express');
const userRouter = express.Router();

const {
  getUsers,
  createUser,
  getOneUser,
  deleteUser,
  updateUser,
} = require('./usersServices');

// USERS ROUTES
userRouter.get('/', (request, response) => {
  const users = getUsers();

  response.send(users);
});

userRouter.post('/', (request, response) => {
  try {
    const { name } = request.body;
    const newUser = createUser(name);

    response.statusCode = 201;
    response.send(newUser);
  } catch (err) {
    response.sendStatus(400);
  }
});

userRouter.get('/:id', (request, response) => {
  try {
    const { id } = request.params;
    const user = getOneUser(id);

    response.send(user);
  } catch (err) {
    response.sendStatus(404);
  }
});

userRouter.delete('/:id', (request, response) => {
  try {
    const { id } = request.params;

    deleteUser(id);
    response.sendStatus(204);
  } catch (err) {
    response.sendStatus(404);
  }
});

userRouter.patch('/:id', (request, response) => {
  try {
    const { id } = request.params;
    const { name } = request.body;

    const updatedUser = updateUser(id, name);

    response.send(updatedUser);
  } catch (err) {
    if (err.message === 'User does not exist.') {
      response.sendStatus(404);
    }

    if (err.message === 'Name was not provided.') {
      response.sendStatus(422);
    }
  }
});

module.exports = userRouter;
