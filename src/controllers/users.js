'use strict';

const userServices = require('../services/users');

const getAllUsers = (req, res) => {
  const users = userServices.getAllUsers();

  res.send(users);
};

const getUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getUserById(userId);

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

  const newUser = userServices.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.removeUser(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  userServices.updateUser(userId, name);

  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  removeUser,
  updateUser,
};
