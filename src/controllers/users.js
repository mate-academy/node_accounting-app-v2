'use strict';

const userService = require('./services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  if (!users) {
    res.sendStatus(400);

    return;
  }

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    req.sendStatus(422);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusCode(404);

    return;
  }

  userService(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  Object.assign(foundUser, { name });

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
