'use strict';

const userService = require('../services/user.service');

const getUsers = (req, res) => {
  res.send(userService.getAll());
};

const getUser = (req, res) => {
  const userId = +req.params.id;

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.status(201).send(newUser);
};

const removeUser = (req, res) => {
  const userId = +req.params.id;

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const userId = +req.params.id;
  const { name } = req.body;
  const user = userService.getById(userId);

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updetedUser = userService.update(userId, name);

  res.send(updetedUser);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  removeUser,
  updateUser,
};
