'use strict';

const userService = require('../services/user.services');

const getAll = (_, res) => {
  res.statusCode = 200;
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const user = userService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = userService.update({
    id,
    name,
  });

  res.statusCode = 200;
  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  userService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
