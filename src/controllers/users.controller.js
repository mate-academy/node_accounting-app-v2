'use strict';

const {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} = require('../services/users.service');
const { isEmpty } = require('../services/helpers');

function listUsers(req, res) {
  res.json(getUsers());
}

function getUser(req, res) {
  const user = getUserById(req.params.id);

  if (!user) {
    return res.status(404).end();
  }

  res.json(user);
}

function createUserHandler(req, res) {
  const name = req.body?.name;

  if (isEmpty(name)) {
    return res.status(400).end();
  }

  const user = createUser({ name });

  res.status(201).json(user);
}

function handleUpdate(req, res) {
  const user = updateUser(req.params.id, req.body ?? {});

  if (!user) {
    return res.status(404).end();
  }

  res.json(user);
}

function deleteUserHandler(req, res) {
  const deleted = deleteUser(req.params.id);

  if (!deleted) {
    return res.status(404).end();
  }

  res.status(204).end();
}

module.exports = {
  listUsers,
  getUser,
  createUserHandler,
  handleUpdate,
  deleteUserHandler,
};
