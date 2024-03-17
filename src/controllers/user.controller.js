'use strict';

const userService = require('../services/users.service');

const getAll = (req, res) => {
  res.send(userService.getAllUsers());
};

const getOneUser = (req, res) => {
  const { id } = req.params;

  const user = userService.getUserById(id);

  if (!user) {
    res.status(404).send();
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;
  const user = userService.createUser(name);

  if (typeof name !== 'string') {
    res.status(400).send();
  }

  res.status(201).send(user);
};

const update = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name || !id || typeof name !== 'string') {
    res.sendStatus(400);
  }

  if (!userService.getUserById(id)) {
    res.sendStatus(404);
  }

  const user = userService.updateUser(id, name);

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = userService.getUserById(id);

  if (!user) {
    res.status(404).send();

    return;
  }

  userService.removeUser(+id);
  res.status(204).send();
};

module.exports = {
  getAll,
  getOneUser,
  create,
  update,
  remove,
};
