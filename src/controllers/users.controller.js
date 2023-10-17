'use strict';

const userService = require('../services/users.services');
const idGenerator = require('../utils/idGenerator');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = {
    id: idGenerator(userService.getAll()),
    name,
  };

  userService.add(user);

  res.status(201).send(user);
};

const updateUser = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const userToUpdate = userService.update(+id, name);

  if (!id) {
    res.statusCode(400);

    return;
  }

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  res.send(userToUpdate);
};

const deleteById = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.remove(+id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  add,
  deleteById,
  getById,
  updateUser,
};
