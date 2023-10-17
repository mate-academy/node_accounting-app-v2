'use strict';

const { UserService } = require('../services/users.service');

const getAll = (req, res) => {
  const users = UserService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const user = UserService.getById(+id);

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

  const newUser = UserService.create({ name });

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const isDeleted = UserService.remove(+id);

  if (!isDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const user = UserService.update(+id, name);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const UsersController = {
  getAll,
  getById,
  create,
  remove,
  update,
};

module.exports = {
  UsersController,
};
