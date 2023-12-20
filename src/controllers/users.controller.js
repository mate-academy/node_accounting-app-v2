'use strict';

const userService = require('../services/users.service');

const get = (req, res) => {
  res.send(userService.getUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const normalizedId = parseInt(id);

  const user = userService.getUserById(normalizedId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  const normalizedId = parseInt(id);

  const user = userService.getUserById(normalizedId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(normalizedId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const normalizedId = parseInt(id);

  if (!userService.getUserById(normalizedId)) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.updateUser({
    normalizedId, name,
  });

  res.send(updatedUser);
};

module.exports = {
  get, getOne, create, remove, update,
};
