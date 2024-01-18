'use strict';

const userService = require('../services/user.service');

const getAll = (_, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id || Number.isNaN(id) || !isFinite(id) || id <= 0) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(Number(id));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.status(201).send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  const userToRemove = userService.getById(Number(id));

  if (!userToRemove) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userToRemove.id);

  res.sendStatus(204);
};

const patch = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (
    !id
    || Number.isNaN(id)
    || !isFinite(id)
    || id <= 0
    || !name
    || typeof name !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  const userToUpdate = userService.getById(Number(id));

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.patch(userToUpdate.id, name);

  res.status(200).send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  patch,
};
