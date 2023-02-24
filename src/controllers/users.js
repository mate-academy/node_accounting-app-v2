'use strict';

const userService = require('../services/users');

const getAll = (_, response) => {
  const users = userService.getAllUsers();

  response.send(users);
};

const getOne = (request, response) => {
  const { userId } = request.params;

  if (isNaN(userId)) {
    response.sendStatus(400);

    return;
  }

  const user = userService.getUserById(userId);

  if (!user) {
    response.sendStatus(404);

    return;
  }

  response.send(user);
};

const add = (request, response) => {
  const { name } = request.body;

  if (!name || !name.length) {
    response.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  response.statusCode = 201;

  response.send(newUser);
};

const remove = (request, response) => {
  const { userId } = request.params;
  const user = userService.getUserById(userId);

  if (!user) {
    response.sendStatus(404);

    return;
  }

  response.sendStatus(204);
  userService.deleteUser(userId);
};

const update = (request, response) => {
  const { userId } = request.params;
  const user = userService.getUserById(userId);

  if (!user) {
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
