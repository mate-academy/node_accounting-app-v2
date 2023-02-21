'use strict';

const userService = require('../services/usersServices');

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
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
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
  const fieldsToUpdate = req.body;

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.updateUser({
    userId, fieldsToUpdate,
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
