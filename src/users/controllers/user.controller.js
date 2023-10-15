'use strict';

const userService = require('../services/user.service.js');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

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

  const user = userService.create(name);

  res.statusCode = 201;

  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userService.update({
    id,
    name,
  });

  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;

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
