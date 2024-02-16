'use strict';

const usersService = require('../services/user.service');

const get = (req, res) => {
  res.send(usersService.getAll());
};

const getOne = (req, res) => {
  const id = parseInt(req.params.id);
  const user = usersService.getById(id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
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
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = usersService.update(
    {
      id,
      name,
    }
  );

  res.send(updatedUser);
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

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
