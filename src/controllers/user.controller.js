'use strict';

const userService = require('../services/user.service');

const getAll = (req, res) => {
  res.json(userService.readAll());
};

const get = (req, res) => {
  const { id } = req.query;

  if (!userService.read(id)) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(userService.read(id));
};

const create = (req, res) => {
  const body = req.body;

  if (!body.hasOwnProperty('name')) {
    res.sendStatus(400);

    return;
  }

  res.status(201).json(userService.create(body));
};

const remove = (req, res) => {
  const { id } = req.query;

  if (!userService.read(id)) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.query;
  const body = req.body;

  if (!userService.read(id)) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(userService.update(id, body));
};

module.exports = {
  getAll,
  get,
  create,
  remove,
  update,
};
