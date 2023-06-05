'use strict';

const userService = require('../services/users');

const getOne = (req, res) => {
  const { userId } = req.params;

  if (isNaN(Number(userId))) {
    res.sendStatus(400);

    return;
  }

  const reqUser = userService.getById(Number(userId));

  if (!reqUser) {
    res.sendStatus(404);

    return;
  }

  res.send(reqUser);
};

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  res.status(201);
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.removeUser(Number(userId));
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (isNaN(Number(userId)) || !name) {
    res.sendStatus(400);

    return;
  }

  const reqUser = userService.getById(Number(userId));

  if (!reqUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.updateUser(Number(userId), name);

  res.send(updatedUser);
};

module.exports = {
  getOne,
  getAll,
  createUser,
  removeUser,
  updateUser,
};
