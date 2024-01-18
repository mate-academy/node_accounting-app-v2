'use strict';

const userService = require('./../serveces/user.serveces');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(+id);

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

  res.status(201).send(userService.create(name));
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(+id)) {
    return res.sendStatus(404);
  }

  userService.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (isNaN(+id) || !name) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  res.send(userService.update(+id, name));
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
