'use strict';

const userService = require('./../services/user.service');

const getAll = (req, res) => {
  return res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = userService.create(name);

  res.statusCode = 201;

  return res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  userService.update(user, name);

  return res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    return res.sendStatus(404);
  }

  userService.remove(id);

  return res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
