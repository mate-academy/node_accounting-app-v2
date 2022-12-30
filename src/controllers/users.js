'use strict';

const userServices = require('../services/users');

const getAllUsers = (req, res) => {
  const users = userServices.getUsers();

  res.statusCode = 200;
  res.send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const foundUser = userServices.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.createUser(name);

  res.statusCode = 201;

  res.send(newUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  const filteredUsers = userServices.getUserById(id);

  if (!filteredUsers) {
    res.sendStatus(404);

    return;
  }

  userServices.removeUser(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  const foundUser = userServices.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);
  }

  userServices.updateUser({
    id,
    name,
  });

  res.statusCode = 200;

  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
