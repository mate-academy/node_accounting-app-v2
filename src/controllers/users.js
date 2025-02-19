'use strict';

const { usersServices } = require('../services/users');

const getAll = (req, res) => {
  const users = usersServices.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { userId } = req.params;

  const user = usersServices.getById(Number(userId));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('name is required');

    return;
  }

  const newUser = usersServices.create(name);

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  const status = usersServices.remove(Number(userId));

  if (!status) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const updatedUser = usersServices.update(Number(userId), name);

  if (!name) {
    res.status(400).send('name is required');

    return;
  }

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(updatedUser);
};

const usersController = {
  getAll,
  getById,
  create,
  remove,
  update,
};

module.exports = { usersController };
