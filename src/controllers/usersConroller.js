'use strict';

const usersService = require('./../services/usersService');

const get = (req, res) => {
  res.send(usersService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id || !isFinite(id)) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id || !isFinite(id)) {
    res.sendStatus(400);

    return;
  }

  if (!usersService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(+id);

  res.sendStatus(204);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = usersService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !isFinite(id) || !name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (!usersService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  const user = usersService.update(+id, name);

  res.send(user);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
