'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getUsers();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(422);

    return;
  }

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
  }

  const newUser = userService.createUser(name);

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.updateUser({
    id: userId,
    name,
  });

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
