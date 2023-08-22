'use strict';

const userService = require('../services/users.js');

function getUsers(req, res) {
  const users = userService.getUsers();

  res.send(users);
};

function getUser(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(404);

    return;
  }

  const foundUser = userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

function deleteUser(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  userService.deleteUser(userId);
  res.sendStatus(204);
};

function updateUser(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  userService.updateUser({
    id: userId,
    name,
  });

  res.send(foundUser);
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
