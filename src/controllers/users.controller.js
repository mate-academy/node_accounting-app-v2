'use strict';

const status = require('../utils/constants');
const userService = require('../services/users.services');
const idGenerator = require('../utils/idGenerator');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(status.NOT_FOUND);

    return;
  }

  res.status(status.OK).send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(status.BAD_REQUEST);

    return;
  }

  const user = {
    id: idGenerator(userService.getAll()),
    name,
  };

  userService.add(user);

  res.status(status.CREATED).send(user);
};

const updateUser = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!id) {
    res.statusCode(status.BAD_REQUEST);

    return;
  }

  const userToUpdate = userService.update(+id, name);

  if (!userToUpdate) {
    res.sendStatus(status.NOT_FOUND);

    return;
  }

  res.send(userToUpdate);
};

const deleteById = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(status.NOT_FOUND);

    return;
  }

  userService.remove(+id);

  res.sendStatus(status.NO_CONTENT);
};

module.exports = {
  getAll,
  add,
  deleteById,
  getById,
  updateUser,
};
