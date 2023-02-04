'use strict';

const usersServices = require('../services/users');

function getAll(req, res) {
  const users = usersServices.getAll();

  res.statusCode = 200;
  res.send(users);
}

function addUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersServices.addUser(name);

  res.statusCode = 201;
  res.send(newUser);
}

function getById(req, res) {
  const { userId } = req.params;

  const foundUser = usersServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
}

function removeUser(req, res) {
  const { userId } = req.params;

  const userToRemove = usersServices.getById(userId);

  if (!userToRemove) {
    res.sendStatus(404);

    return;
  }

  usersServices.removeUser(userId);
  res.sendStatus(204);
}

function updateUser(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  const userToUpdate = usersServices.getById(userId);

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = usersServices.updateUser(userId, name);

  res.statusCode = 200;
  res.send(updatedUser);
}

module.exports = {
  getAll,
  addUser,
  getById,
  removeUser,
  updateUser,
};
