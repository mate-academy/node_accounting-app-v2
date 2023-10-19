'use strict';

const userService = require('../services/users.service');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const getUser = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = {
    id: +new Date(),
    name,
  };

  userService.add(user);

  res.statusCode = 201;

  res.send(user);
};

const removeUser = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.remove(+id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getById(+id);

  if (!user) {
    res.statusCode(404);

    return;
  }

  userService.update(+id, name);
  res.statusCode = 200;
  res.send(user);
};

module.exports = {
  getAll,
  addUser,
  getUser,
  removeUser,
  updateUser,
};
