'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const get = (req, res) => {
  const { userId } = req.params;
  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
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

const remove = (req, res) => {
  const { userId } = req.params;

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  userService.update(userId, name);
  res.send(user);
};

module.exports = {
  getAll,
  get,
  add,
  remove,
  update,
};
