'use strict';

const userServices = require('../services/users.js');

const getAll = (req, res) => {
  const users = userServices.getAll();

  res.send(users);
};

const getUser = (req, res) => {
  const { userId } = req.params;
  const user = userServices.getById(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = userServices.create(name);

  res.statusCode = 201;
  res.send(user);
};

const updateUser = (req, res) => {
  const { userId } = req.params;

  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  userServices.update(userId, name);
  res.send(foundUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  userServices.remove(userId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
