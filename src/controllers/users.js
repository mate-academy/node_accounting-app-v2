'use strict';

const usersModule = require('../services/users');

const getAll = (req, res) => {
  const users = usersModule.getAll();

  res.send(users);
};

const getUser = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersModule.getUserById(userId);

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

  const newUser = usersModule.addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersModule.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersModule.deleteUser(+userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = usersModule.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  Object.assign(foundUser, { name });

  res.send(foundUser);
};

module.exports = {
  getAll,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
