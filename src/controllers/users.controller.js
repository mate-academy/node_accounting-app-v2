'use strict';

const {
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
} = require('../services/users.service');

const getUsers = (req, res) => {
  const users = getAllUsers();

  res.send(users);
};

const getUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  removeUser(userId);
  res.sendStatus(204);
};

const updateUserById = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  updateUser({
    id: userId, name,
  });

  res.statusCode = 200;

  res.send(foundUser);
};

module.exports = {
  getUsers,
  updateUserById,
  getUser,
  addUser,
  deleteUser,
};
