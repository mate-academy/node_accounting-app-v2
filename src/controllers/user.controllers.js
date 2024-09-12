'use strict';

const userService = require('../services/user.service');
const { NOT_FOUND, BAD_REQUEST, NO_CONTENT, CREATED } = require('../variables');

const get = (req, res) => {
  res.send(userService.getAllUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = userService.createUser(name);

  res.status(CREATED).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  userService.deleteUser(id);
  res.sendStatus(NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  const updatedUser = userService.updateUser(id, name);

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
