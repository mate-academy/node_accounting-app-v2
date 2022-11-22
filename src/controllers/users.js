'use strict';

const usersServices = require('../services/users');

const getAllUsers = (req, res) => {
  const users = usersServices.getAllUsers();

  res.send(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersServices.getUserById(userId);

  if (typeof +userId !== 'number'
    || !Number.isInteger(+userId)
    || +userId <= 0
  ) {
    res.sendStatus(400);

    return;
  }

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
  const foundUser = usersServices.getUserById(userId);

  if (typeof +userId !== 'number'
    || !Number.isInteger(+userId)
    || userId <= 0
  ) {
    res.sendStatus(400);

    return;
  }

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
  const foundUser = usersServices.getUserById(userId);

  if (typeof +userId !== 'number' || Number.isInteger(userId)) {
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string' || !name.length) {
    res.sendStatus(400);

    return;
  }

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersServices.updateUser(userId, name);

  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
