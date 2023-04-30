'use strict';

const userService = require('../services/users.js');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const userId = +req.params.userId;

  if (userId < 0) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getUserById(userId);

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

  const newUser = userService.addUser(name);

  res.status(201);
  res.send(newUser);
};

const removeUser = (req, res) => {
  const userId = +req.params.userId;
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const deleted = userService.removeUser(foundUser.id);

  res.status(204);
  res.send(deleted);
};

const updateUser = (req, res) => {
  const userId = +req.params.userId;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userService.updateUser(userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  addUser,
  removeUser,
  updateUser,
};
