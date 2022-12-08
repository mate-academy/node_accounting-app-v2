'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const foundUser = userService.getById(id);

  if (!id) {
    res.sendStatus(400);

    return;
  }

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

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const foundUser = userService.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  userService.update(id, name);

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
