'use strict';

const usersServices = require('../services/users');

const getAll = (req, res) => {
  const users = usersServices.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  const user = usersServices.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = usersServices.create(name);

  res.status(201);
  res.send(newUser);
};

const update = (req, res) => {
  const { userId } = req.params;

  const user = usersServices.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  usersServices.update(userId, name);

  res.send(user);
};

const remove = (req, res) => {
  const { userId } = req.params;

  const user = usersServices.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  usersServices.remove(userId);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
