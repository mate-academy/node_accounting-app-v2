'use strict';

const userService = require('../services/user.service');

const getUsers = (req, res) => {
  res.send(userService.getUsers());
};

const getUser = (req, res) => {
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

  const newUser = userService.postUser(name);

  res.statusCode = 201;

  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!userService.getUserById(id)) {
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

  userService.updateUser({
    id: id, name,
  });

  res.sendStatus = 200;
  res.send(user);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
