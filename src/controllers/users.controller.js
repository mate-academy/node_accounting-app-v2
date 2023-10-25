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

  res.status(201);
  res.send(userServices.createUser(name));
};

const getCurrentUser = (req, res) => {
  const { userId } = req.params;
  const findUser = userServices.getUserById(userId);

  if (!findUser) {
    res.sendStatus(404);

    return;
  }

  res.send(findUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const findUser = userServices.getUserById(userId);

  if (!findUser) {
    res.sendStatus(404);

    return;
  }

  userServices.removeUser(userId);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const findUser = userServices.getUserById(userId);

  if (!findUser) {
    res.sendStatus(404);

    return;
  }

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  res.status(200);
  res.send(userServices.updateUser(userId, name));
};

module.exports = {
  getAllUsers,
  addUser,
  getCurrentUser,
  removeUser,
  updateUser,
};
