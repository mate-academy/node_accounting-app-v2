'use strict';

const userService = require('../services/users.service');
const variable = require('../variables/constants');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const getUser = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(variable.NOT_FOUND);

    return;
  }

  res.send(user);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(variable.BAD_REQUEST);

    return;
  }

  const user = {
    id: Number(new Date()),
    name,
  };

  userService.add(user);

  res.statusCode = variable.CREATED;

  res.send(user);
};

const removeUser = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(variable.NOT_FOUND);

    return;
  }

  userService.remove(id);
  res.sendStatus(variable.DELETED);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getById(id);

  if (!user) {
    res.statusCode(variable.NOT_FOUND);

    return;
  }

  userService.update(id, name);
  res.statusCode = variable.SUCCESSFUL;
  res.send(user);
};

module.exports = {
  getAll,
  addUser,
  getUser,
  removeUser,
  updateUser,
};
