'use strict';

const userService = require('../services/userService');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(Number(id));

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

  const user = userService.create(name);

  res.statusCode = 201;

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(Number(id))) {
    res.sendStatus(404);

    return;
  }

  userService.remove(Number(id));

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(Number(id));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.update({
    id: Number(id),
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
