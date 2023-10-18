'use strict';

const usersService = require('./../services/users.service');

const getAll = (_, res) => {
  res.json(usersService.getAll());
};

const get = (req, res) => {
  const user = usersService.get(+req.params.userId);

  res.json(user);
};

const create = (req, res) => {
  const user = usersService.create(req.body.name);

  res.status(201).json(user);
};

const update = (req, res) => {
  const user = usersService.update(+req.params.userId, req.body.name);

  res.json(user);
};

const remove = (req, res) => {
  usersService.remove(+req.params.userId);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
