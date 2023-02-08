'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { userId } = req.params;

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const update = (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.update(foundUser, name);

  res.statusCode = 200;
  res.send(foundUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

module.exports = {
  getAll, getById, add, update, remove,
};
