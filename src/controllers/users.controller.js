'use strict';

const usersService = require('../services/user.service');

const get = (req, res) => {
  const users = res.send(usersService.getAll());

  return users;
};

const getOne = (req, res) => {
  const { id } = req.params;

  const getUser = usersService.getById(id);

  if (!getUser) {
    res.sendStatus(404);

    return;
  }

  res.send(getUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const updateUser = usersService.update(id, name);

  res.send(updateUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!usersService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
