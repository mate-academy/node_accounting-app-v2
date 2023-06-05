'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const gottenUser = userService.getById(userId);

  if (!gottenUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(gottenUser);
};

const add = (req, res) => {
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
  const { userId } = req.params;
  const gottenUser = userService.getById(userId);

  if (!gottenUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(+userId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const gottenUser = userService.getById(userId);

  if (!gottenUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  userService.update({
    id: userId,
    name,
  });

  res.send(gottenUser);
};

module.exports = {
  add,
  getAll,
  getOne,
  update,
  remove,
};
