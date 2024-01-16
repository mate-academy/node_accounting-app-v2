'use strict';

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
} = require('../services/users.service');

function getUsers(req, res) {
  res.send(getAllUsers());
}

function getOneUser(req, res) {
  const { id } = req.params;

  const expectedUser = getUserById(id);

  if (!expectedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(expectedUser);
}

function createNewUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = createUser(name);

  res.statusCode = 201;
  res.send(newUser);
}

function updateOneUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const normalizedId = +id;

  if (!(isFinite(normalizedId))) {
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string' || name.length === 0) {
    res.sendStatus(400);

    return;
  }

  if (!getUserById(normalizedId)) {
    res.sendStatus(404);

    return;
  }

  res.send(updateUser(normalizedId, name));
}

function deleteUser(req, res) {
  const { id } = req.params;
  const normalizedId = +id;

  if (isNaN(normalizedId)) {
    res.sendStatus(400);

    return;
  }

  if (!getUserById(normalizedId)) {
    res.sendStatus(404);

    return;
  }
  removeUser(normalizedId);

  res.sendStatus(204);
}

module.exports = {
  getUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteUser,
};
