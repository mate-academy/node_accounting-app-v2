'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getUsers();

  res.send(users);
};

const getOne = (req, res) => {
  const userId = Number(req.params.userId);

  if (isNaN(userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const create = (req, res) => {
  const { name } = req.body;
  const isNameValid = typeof name === 'string' && name.length > 0;

  if (!isNameValid) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const userId = Number(req.params.userId);
  const foundUser = userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { name } = req.body;
  const userId = Number(req.params.userId);
  const foundUser = userService.getUser(userId);
  const isNameValid = typeof name === 'string' && name.length > 0;

  if (!isNameValid) {
    res.sendStatus(400);

    return;
  }

  if (isNaN(userId)) {
    res.sendStatus(400);

    return;
  }

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.update({
    id: userId,
    name,
  });

  res.send(userService.getUser(userId));
};

module.exports = {
  getAll,
  getOne,
  remove,
  update,
  create,
};
