'use strict';

const usersService = require('../services/users');

const getAll = (request, response) => {
  const users = usersService.getAll();

  response.send(users);
};

const getById = (request, response) => {
  const { userId } = request.params;
  const user = usersService.findById(userId);

  if (!user) {
    response.sendStatus(404);

    return;
  }

  response.send(user);
};

const createUser = (request, response) => {
  const { name } = request.body;

  if (!name) {
    response.sendStatus(400);

    return;
  }

  response.statusCode = 201;
  response.send(usersService.createUser(name));
};

const remove = (request, response) => {
  const { userId } = request.params;
  const user = usersService.findById(userId);

  if (!user) {
    response.sendStatus(404);

    return;
  }

  usersService.remove(userId);
  response.sendStatus(204);
};

const update = (request, response) => {
  const { userId } = request.params;
  const user = usersService.findById(userId);
  const { name } = request.body;

  if (!user) {
    response.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    response.sendStatus(400);

    return;
  }

  usersService.update(userId, name);

  response.send(user);
};

module.exports = {
  getAll,
  getById,
  createUser,
  remove,
  update,
};
