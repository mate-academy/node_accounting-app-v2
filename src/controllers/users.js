'use strict';

const userService = require('../services/users.js');

const getAll = (req, res) => {
  const user = userService.getAll();

  res.send(user);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUserById(userId);

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

  const newUser = userService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.removeUser(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(404);

    return;
  }

  userService.updateUser({
    id: userId, name,
  });
  res.send(foundUser);
};

module.exports = {
  getOne,
  getAll,
  add,
  remove,
  update,
};
