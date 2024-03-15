'use strict';

const userService = require('../services/user.service');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  res.status(200).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Name is required');

    return;
  }

  const user = userService.create(name);

  res.status(201).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = userService.remove(id);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  res.status(204).send('User deleted');
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Name is required');

    return;
  }

  const user = userService.update(id, name);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  res.status(200).send(user);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
