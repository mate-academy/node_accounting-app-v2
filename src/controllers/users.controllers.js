'use strict';

const usersServices = require('../services/users.services');

const getAllUsers = (request, response) => {
  const users = usersServices.getAllUsers();

  response.send(users);
};

const getUser = (request, response) => {
  const { userId } = request.params;
  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    response.sendStatus(404);

    return;
  }

  response.send(foundUser);
};

const createUser = (request, response) => {
  const { name } = request.body;

  if (!name) {
    response.sendStatus(400);

    return;
  }

  const newUser = usersServices.createUser(name);

  response.statusCode = 201;
  response.send(newUser);
};

const removeUser = (request, response) => {
  const { userId } = request.params;
  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    response.sendStatus(404);

    return;
  }

  usersServices.removeUser(userId);

  response.sendStatus(204);
};

const updateUser = (request, response) => {
  const { userId } = request.params;
  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    response.sendStatus(404);

    return;
  }

  const { name } = request.body;

  if (!name) {
    response.sendStatus(400);
  }

  if (typeof name !== 'string') {
    response.sendStatus(422);

    return;
  }

  usersServices.updateUser(userId, name);
  response.send(foundUser);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  removeUser,
  updateUser,
};
