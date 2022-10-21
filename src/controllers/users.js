'use strict';

const userService = require('../services/users.js');

function getAll(req, res) {
  const users = userService.getAll();

  res.send(users);
}

function getOne(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    res.send(404);

    return;
  }

  res.send(foundUser);
}

function addUser(req, res) {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
}

function updateUser(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    res.send(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = userService.update(+userId, name);

  res.send(updatedUser);
}

function removeUser(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    res.send(404);

    return;
  }

  userService.remove(+userId);

  res.sendStatus(204);
}

module.exports = {
  getAll,
  getOne,
  addUser,
  updateUser,
  removeUser,
};
