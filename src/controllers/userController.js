'use strict';

const {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  upgradeUser,
} = require('../services/usersService');

const getUsers = (req, res) => {
  res.status(200);
  res.send(getAllUsers());
};

const getUser = (req, res) => {
  const { id } = req.params;

  const mayBeUser = getUserById(id);

  if (!mayBeUser) {
    res.sendStatus(404);
  }

  res.send(mayBeUser);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const newUser = createNewUser(name);

  res.status(201);
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  if (!getUserById(id)) {
    res.sendStatus(404);
  }

  deleteUser(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    res.sendStatus(404);
  }

  if (!name) {
    res.sendStatus(400);
  }

  const updatedUser = upgradeUser(id, name);

  res.status(200);
  res.send(updatedUser);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  removeUser,
  updateUser,
};
