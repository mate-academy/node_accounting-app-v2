'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.send('User not found');

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.send('Name field is empty');

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.send('User not found');

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.send('User not found');

    return;
  }

  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.statusCode = 400;
    res.send('Invalid name');

    return;
  }

  const updated = userService.update(userId, name);

  res.send(updated);
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
