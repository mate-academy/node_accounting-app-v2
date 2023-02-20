'use strict';

const userService = require('../services/users');

function getAll(req, res) {
  const users = userService.getAll();

  res.send(users);
}

function getUserId(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
}

function addUser(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  if (!userId || !name) {
    res.sendStatus(400);
  }

  const newUser = userService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
}

function deleteUser(req, res) {
  const { userId } = req.params;

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.removeUser(userId);
  res.sendStatus(204);
}

function updateUser(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.updateUser({
    id: userId, name,
  });

  res.send(foundUser);
}

module.exports = {
  getAll,
  getUserId,
  addUser,
  deleteUser,
  updateUser,
};
