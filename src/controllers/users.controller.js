'use strict';

const userService = require('../services/user.service');

const get = (req, res) => {
  const users = res.send(userService.getAllUsers());

  return users;
};

const getOne = (req, res) => {
  const { id } = req.params;

  const getUser = userService.getUserById(id);

  res.send(getUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const updateUser = userService.updateUser(id, name);

  res.send(updateUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.removeUser(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
