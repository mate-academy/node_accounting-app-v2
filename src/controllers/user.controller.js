'use strict';

const userService = require('../services/user.service');

const get = (req, res) => {
  res
    .status(201)
    .send(userService.getAll());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  res
    .status(201)
    .send(userService.create(name));
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.sendStatus(400);
  }

  const result = userService.findById(id);

  if (!result) {
    return res.sendStatus(404);
  }

  return res
    .status(200)
    .send(result);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.sendStatus(400);
  }

  const result = userService.remove(id);

  if (!result) {
    return res.sendStatus(404);
  }

  res
    .status(200)
    .send(result);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || isNaN(+id) || !name) {
    return res.sendStatus(400);
  }

  const result = userService.update(id, name);

  if (!result) {
    return res.status(404);
  }

  res
    .status(200)
    .send(result);
};

module.exports = {
  get,
  create,
  getById,
  remove,
  update,
};
