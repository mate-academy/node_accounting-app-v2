'use strict';

const usersServices = require('../services/users.service.js');

const getAllUsers = (request, response) => {
  response.send(usersServices.getAllUsers());
};

const addUser = (request, response) => {
  const { name } = request.body;

  if (!name) {
    response.sendStatus(400);

    return;
  }

  response.status(201).send(usersServices.createUser(name));
};

const getCurrentUser = (request, response) => {
  const { userId } = request.params;
  const findUserById = usersServices.getUserById(userId);

  if (!findUserById) {
    response.sendStatus(404);

    return;
  }

  response.send(findUserById);
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
  const { name } = request.body;
  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    response.sendStatus(404);

    return;
  }

  if (!name || typeof name !== 'string') {
    response.sendStatus(400);

    return;
  }

  response.send(usersServices.updateUser(userId, name));
};

module.exports = {
  getAllUsers,
  addUser,
  getCurrentUser,
  removeUser,
  updateUser,
};
