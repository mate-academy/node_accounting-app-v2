'use strict';

const usersService = require('../services/users.service');

const get = (_, res) => {
  res.send(usersService.getUsers());
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getUserById(id);

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

  const user = usersService.createUser(name);

  res.status(201).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  usersService.removeUser(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usersService.getUserById(id);

  if (!name) {
    res.sendStatus(422);
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const newData = usersService.updateUser(user, name);

  res.send(newData);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
