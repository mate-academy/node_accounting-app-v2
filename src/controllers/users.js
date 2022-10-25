'use strict';

const {
  getUserById,
  postUser,
  deleteUser,
  updateUser,
  getUserData,
} = require('../services/users');

const allUsers = () => {
  const users = getUserData();

  return users;
};

const controllerGetAllUsers = (req, res) => {
  const users = getUserData();

  res.statusCode = 200;

  res.send(users);
};

const controllerPostUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = postUser(name);

  res.statusCode = 201;
  res.send(user);
};

const controllerGetUserById = (req, res) => {
  const { userId } = req.params;
  const user = getUserById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const controllerDeleteUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  deleteUser(userId);

  res.sendStatus(204);
};

const controllerUpdateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = getUserById(userId);

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  updateUser(userId, name);
  res.send(foundUser);
};

module.exports = {
  controllerDeleteUser,
  controllerGetAllUsers,
  controllerGetUserById,
  controllerPostUser,
  controllerUpdateUser,
  allUsers,
};
