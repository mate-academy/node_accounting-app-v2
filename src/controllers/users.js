'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  const currentUser = userService.getById(userId);

  if (!currentUser) {
    res.sendStatus(404);

    return;
  }

  res.send(currentUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);
  }

  const newUser = userService.createUser(name);

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  const currentUser = userService.getById(userId);

  if (!currentUser) {
    res.sendStatus(404);

    return;
  }

  userService.removeUser(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;

  const currentUser = userService.getById(userId);

  if (!currentUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  userService.update(userId, name);
  res.send(currentUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
