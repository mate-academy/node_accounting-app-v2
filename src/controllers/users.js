'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const get = (req, res) => {
  const { id } = req.params;
  const user = userService.getBy(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
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

const remove = (req, res) => {
  const { id } = req.params;
  const user = userService.getBy(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const user = userService.getBy(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  const updatedUser = userService.update({
    id, name,
  });

  res.send(updatedUser);
};

module.exports = {
  get,
  getAll,
  create,
  remove,
  update,
};
