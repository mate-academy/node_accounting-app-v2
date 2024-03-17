'use strict';

const
  {
    NOT_FOUND,
    BAD_REQUEST,
    NO_CONTENT,
    CREATED,
  } = require('../constants');

const userService = require('../services/users.service');

const getAll = (req, res) => {
  res.send(userService.getAllUsers());
};

const getOneUser = (req, res) => {
  const { id } = req.params;

  const user = userService.getUserById(id);

  if (!user) {
    res.status(NOT_FOUND).send();
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;
  const user = userService.createUser(name);

  if (typeof name !== 'string') {
    res.status(BAD_REQUEST).send();
  }

  res.status(CREATED).send(user);
};

const update = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name || !id || typeof name !== 'string') {
    res.sendStatus(BAD_REQUEST);
  }

  if (!userService.getUserById(id)) {
    res.sendStatus(NOT_FOUND);
  }

  const user = userService.updateUser(id, name);

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = userService.getUserById(id);

  if (!user) {
    res.status(NOT_FOUND).send();

    return;
  }

  userService.removeUser(+id);
  res.status(NO_CONTENT).send();
};

module.exports = {
  getAll,
  getOneUser,
  create,
  update,
  remove,
};
