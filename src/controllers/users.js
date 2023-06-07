'use strict';

const userServices = require('../services/users.js');

const getAll = (req, res) => {
  const users = userServices.getAll();

  res.send(users);
};

const getUserById = (req, res) => {
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

  res.status(201).send(user);
};

const updateUserById = (req, res) => {
  const { userId } = req.params;

  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  userServices.updateById(userId, name);
  res.send(foundUser);
};

const removeUserById = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  userServices.removeById(userId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUserById,
  removeUserById,
};
