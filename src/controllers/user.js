'use strict';

const userService = require('../services/user');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(+userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.add(name);

  res.status(201);
  res.send(user);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const user = userService.getById(+userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.remove(+userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name || !userId) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(+userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.update(+userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
