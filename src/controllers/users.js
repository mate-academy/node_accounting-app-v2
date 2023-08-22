'use strict';

const usersService = require('../services/users');

function getAll(req, res) {
  const users = usersService.getAllUsers();

  res.status(200).send(users);
}

function getUserById(req, res) {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundUser);
}

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.createUser(name);

  res.status(201).send(newUser);
}

function deleteUser(req, res) {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(userId);
  res.sendStatus(204);
}

function updateUser(req, res) {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.sendStatus(400);

    return;
  }

  usersService.updateUser({
    userId, name,
  });

  res.status(200).send(foundUser);
}

module.exports = {
  getAll,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
