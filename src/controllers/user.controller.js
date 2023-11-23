'use strict';

const {
  getAllUsers,
  addUser,
  getUserById,
  updateUserInfo,
  removeUserById,
} = require('../services/user.servise');

const getUsers = (req, res) => {
  const users = getAllUsers();

  if (!users) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(getAllUsers());
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getOneUser = (req, res) => {
  const { id } = req.params;

  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const newUser = updateUserInfo(user, name);

  res.statusCode = 200;
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  removeUserById(id);

  res.sendStatus(204);
};

module.exports = {
  getUsers,
  createUser,
  getOneUser,
  updateUser,
  removeUser,
};
