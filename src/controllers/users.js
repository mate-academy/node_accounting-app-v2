'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { id } = req.params;
  const foundUser = userService.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }
  res.statusCode = 200;
  res.send(foundUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const foundUser = userService.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  userService.update({
    id, name,
  });
  res.send(foundUser);
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

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
