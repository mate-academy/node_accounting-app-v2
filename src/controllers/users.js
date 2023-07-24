'use strict';

const usersService = require('../services/users');

const getUserById = async(request, response) => {
  const { userId } = request.params;

  if (!userId) {
    response
      .sendStatus(400);

    return;
  }

  const user = await usersService.getUserById(userId);

  if (!user) {
    response
      .sendStatus(404);

    return;
  }

  response
    .status(200)
    .send(user);
};

const getAllUsers = async(request, response) => {
  const users = usersService.getUsers();

  response
    .status(200)
    .send(users);
};

const addUser = async(request, response) => {
  const { name } = request.body;

  if (!name) {
    response
      .sendStatus(400);

    return;
  }

  const user = usersService.addUser(name);

  response
    .status(201)
    .send(user);
};

const updateUser = async(request, response) => {
  const { userId } = request.params;

  if (!userId) {
    response
      .sendStatus(400);

    return;
  }

  const { name } = request.body;

  if (!name) {
    response
      .sendStatus(400);

    return;
  }

  const user = await usersService.updateUser(userId, name);

  if (!user) {
    response
      .sendStatus(404);

    return;
  }

  response
    .status(200)
    .send(user);
};

const deleteUser = async(request, response) => {
  const { userId } = request.params;

  if (!userId) {
    response
      .sendStatus(400);

    return;
  }

  const isUserDeleted = usersService.deleteUser(userId);

  if (!isUserDeleted) {
    response
      .sendStatus(404);

    return;
  }

  response
    .sendStatus(204);
};

module.exports = {
  getUserById,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
