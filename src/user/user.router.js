/* eslint-disable no-console */
'use strict';

const express = require('express');

const userService = require('./user.service.js');

const userRouter = express.Router();

userRouter.get('/', (request, response) => {
  const users = userService.getUsers();

  response.send(users);
});

userRouter.get('/:id', (request, response) => {
  const { id } = request.params;

  const user = userService.getUserById(parseInt(id));

  if (!user) {
    return response.sendStatus(404);
  }

  response.send(user);
});

userRouter.post('/', (request, response) => {
  if (!request.body || !request.body.name) {
    return response.sendStatus(400);
  }

  const user = userService.createUser(request.body);

  response.status(201);
  response.send(user);
});

userRouter.patch('/:id', (request, response) => {
  const { id } = request.params;

  if (!request.body.name) {
    return response.sendStatus(400);
  }

  const user = userService.updateUserById(parseInt(id), request.body);

  if (!user) {
    return response.sendStatus(404);
  }

  response.send(user);
});

userRouter.delete('/:id', (request, response) => {
  const { id } = request.params;

  const deletedUser = userService.deleteUserById(parseInt(id));

  if (!deletedUser) {
    return response.sendStatus(404);
  }

  response.sendStatus(204);
});

module.exports = userRouter;
