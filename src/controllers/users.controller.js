'use strict';

const userServices = require('../services/users.services');

const getAllUsers = (_req, res) => {
  res.send(userServices.getAllUsers());
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(userServices.createUser(name));
};

const getCurrentUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
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
  const { name } = req.body;
  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  res.send(userServices.updateUser(userId, name));
};

module.exports = {
  getAllUsers,
  addUser,
  getCurrentUser,
  removeUser,
  updateUser,
};
