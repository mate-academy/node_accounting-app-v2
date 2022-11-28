'use strict';

const usersServices = require('../services/users');

const getAllUsers = (req, res) => {
  const users = usersServices.getAllUsers();

  res.send(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  if (isNaN(parseInt(userId))) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name.length) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersServices.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;

  if (isNaN(parseInt(userId))) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersServices.removeUser(userId);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (isNaN(parseInt(userId))) {
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string' || !name.length) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const upadetedUser = usersServices.updateUser(userId, name);

  res.send(upadetedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
