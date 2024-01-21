'use strict';

const usersService
  = require('../services/usersService');

const get = (req, res) => {
  res.send(usersService.getAll());
};
const getOnce = (req, res) => {
  const { id } = req.params;
  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};
const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);
  }

  const user = usersService.createUser(name);

  res.statusCode = 201;
  res.send(user);
};
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string' || !name.length) {
    res.sendStatus(422);
  }

  const newUpdateUser = usersService.update(id, name);

  res.send(newUpdateUser);
};
const removeUser = (req, res) => {
  const { id } = req.params;

  if (!usersService.getById(id)) {
    res.sendStatus(404);
  }
  usersService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOnce,
  create,
  updateUser,
  removeUser,
};
