'use strict';

const userService = require('../services/user.services');

const getAllUsers = (req, res) => {
  if (!userService.getUsers()) {
    return [];
  }

  res.send(userService.getUsers());
};

const getOneUser = (req, res) => {
  const { id } = req.params;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.createUser(name);

  res.statusCode = 201;

  res.send(user);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.removeUser(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userService.updateUser({ id, name });

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  removeUser,
  updateUser,
};
