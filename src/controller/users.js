'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { userId } = req.params;

  if (isNaN(userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const createNew = (req, res) => {
  const name = req.body.name;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.createNew(name);

  res.status(201);
  res.send(user);
};

const deleteById = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }
  userService.deleteById(+userId);
  res.sendStatus(204);
};

const updateById = (req, res) => {
  const { userId } = req.params;
  const userName = req.body.name;

  if (isNaN(userId)) {
    res.sendStatus(400);

    return;
  }

  if (!userName) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }
  userService.updateById(+userId, userName);
  res.send(userService.getById(+userId));
};

module.exports = {
  getAll,
  getById,
  createNew,
  deleteById,
  updateById,
};
