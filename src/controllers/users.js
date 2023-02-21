'use strict';

const userService = require('../services/users');

const getAll = (request, response) => {
  const users = userService.getAllUsers();

  response.send(users);
};

const getOne = (request, response) => {
  const { userId } = request.params;

  if (typeof +userId !== 'number') {
    response.sendStatus(400);

    return;
  }

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    response.sendStatus(404);

    return;
  }

  response.send(foundUser);
};

const add = (request, response) => {
  const { name } = request.body;

  if (!name) {
    response.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  response.statusCode = 201;

  response.send(newUser);
};

const remove = (request, response) => {
  const { userId } = request.params;
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    response.sendStatus(404);

    return;
  }

  response.sendStatus(204);
  userService.deleteUser(userId);
};

const update = (request, response) => {
  const { userId } = request.params;
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    response.sendStatus(404);

    return;
  }

  const { name } = request.body;

  if (typeof name !== 'string') {
    response.sendStatus(400);

    return;
  }

  const updatedUser = userService.updateUser({
    id: userId,
    name,
  });

  response.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
