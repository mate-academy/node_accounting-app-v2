'use strict';

const { getUserById,
  postUser,
  deleteUser,
  updateUser } = require('../services/users');

let users = [];

const usersArray = () => {
  users = [];
};

const allUsers = () => {
  return users;
};

const controllerGetAllUsers = (req, res) => {
  res.statusCode = 200;

  res.send(users);
};

const controllerPostUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = postUser(name, users);

  res.statusCode = 201;
  res.send(user);
};

const controllerGetUserById = (req, res) => {
  const { userId } = req.params;
  const user = getUserById(userId, users);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const controllerDeleteUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = getUserById(+userId, users);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  users = deleteUser(userId, users);

  res.sendStatus(204);
};

const controllerUpdateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = getUserById(userId, users);

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  updateUser(userId, name, users);
  res.send(foundUser);
};

module.exports = {
  controllerDeleteUser,
  controllerGetAllUsers,
  controllerGetUserById,
  controllerPostUser,
  controllerUpdateUser,
  usersArray,
  allUsers,
};
