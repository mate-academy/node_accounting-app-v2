'use strict';

const userService = require('../services/users.js');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }
  res.send(foundUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;

  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  userService.update({
    userId, name,
  });

  res.statusCode = 200;
  res.send(foundUser);
};

module.exports = {
  getAll, create, getOne, remove, update,
};
