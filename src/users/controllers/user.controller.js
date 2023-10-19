'use strict';

const userService = require('../services/user.service.js');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const id = Number(req.params.id);

  const user = userService.getById(id);

  res.setHeader('Content-type', 'application/json');

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

  const user = userService.create(name);

  res.statusCode = 201;

  res.send(user);
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = userService.getById(id);

  if (!user
    || typeof name !== 'string') {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.update({
    id,
    name,
  });

  res.send(updatedUser);
};

const remove = (req, res) => {
  const id = Number(req.params.id);

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
