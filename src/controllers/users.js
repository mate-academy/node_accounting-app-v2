'use strict';

const {
  findUserService,
  createUserService,
  deleteUserService,
  users,
} = require('../services/users.service');

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = createUserService(name);

  res.status(201).send(newUser);
}

function getUsers(req, res) {
  res.status(200).send(users);
}

function getUser(req, res) {
  const { userId } = req.params;

  const user = findUserService(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).send(user);
}

function updateUser(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  const updatedUser = findUserService(userId);

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  updatedUser.name = name;

  res.status(200).send(updatedUser);
}

function deleteUser(req, res) {
  const { userId } = req.params;

  if (!users.some(user => user.id === +userId)) {
    res.sendStatus(404);

    return;
  }

  deleteUserService(userId);

  res.sendStatus(204);
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
