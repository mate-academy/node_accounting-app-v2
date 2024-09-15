'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const requestedUser = userService.getOne(userId);

  if (!requestedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(requestedUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.add(name);

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const requestedUser = userService.getOne(userId);

  if (!requestedUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const requestedUser = userService.getOne(userId);

  if (!requestedUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.update(userId, name, requestedUser);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
