'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getUsers();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.createUser(name);

  res.statusCode = 201;
  res.send(user);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const user = userService.getUser(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const user = userService.getUser(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  const upratedUser = userService.updateUser({
    id: userId, name,
  });

  res.statusCode = 200;
  res.send(upratedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
