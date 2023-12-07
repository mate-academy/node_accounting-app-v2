'use strict';

const userService = require('../services/user.service');

const getAll = (_, res) => {
  res.send(userService.getAllUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = userService.getUser(id);

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

  res.status(201);
  res.send(userService.addUser(name));
};

const remove = (req, res) => {
  const { id } = req.params;
  const users = userService.removeUser(id);

  if (!users) {
    res.sendStatus(404);

    return;
  }

  res.status(204);
  res.send(users);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.updateUser(id, name);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  res.send(user);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
