'use strict';

const {
  getUsers,
  getUserById,
  addUser,
  removeUser,
  updateUser,
} = require('../services/users');

const getUsersController = (req, res) => {
  const users = getUsers();

  res.send(users);
};

const getUserController = (req, res) => {
  const { id } = req.params;

  const user = getUserById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const addUserController = (req, res) => {
  const { name } = req.body;

  const user = addUser(name);

  res.statusCode = 201;
  res.send(user);
};

const removeUserController = (req, res) => {
  const { id } = req.params;

  removeUser(+id);

  res.sendStatus(204);
};

const updateUserController = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = updateUser(+id, name);

  if (!user) {
    res.sendStatus(404);
  }

  res.send(user);
};

module.exports = {
  getUsersController,
  getUserController,
  addUserController,
  removeUserController,
  updateUserController,
};
