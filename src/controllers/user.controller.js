'use strict';

const userService = require('../services/user.service');

const get = (request, response) => {
  response.send(userService.getUsers());
};

const getOne = (request, response) => {
  const { id } = request.params;

  const user = userService.getUserById(parseInt(id));

  if (!user) {
    return response.sendStatus(404);
  }

  response.send(user);
};

const create = (request, response) => {
  if (!request.body || !request.body.name) {
    return response.sendStatus(400);
  }

  const user = userService.createUser(request.body);

  response.status(201);
  response.send(user);
};

const update = (request, response) => {
  const { id } = request.params;

  if (!request.body.name) {
    return response.sendStatus(400);
  }

  const user = userService.updateUserById(parseInt(id), request.body);

  if (!user) {
    return response.sendStatus(404);
  }

  response.send(user);
};

const remove = (request, response) => {
  const { id } = request.params;

  const deletedUser = userService.deleteUserById(parseInt(id));

  if (!deletedUser) {
    return response.sendStatus(404);
  }

  response.sendStatus(204);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
