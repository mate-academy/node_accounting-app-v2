'use strict';

const userServices = require('../sevices/users');

const getUsers = (req, res) => {
  const users = userServices.getAll();

  res.send(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

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

  userServices.updateUser(userId, name);
  res.send(foundUser);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
