'use strict';

const usersService = require('../services/users.service');

function getAll(req, res) {
  res.send(usersService.getAll());
}

function getOne(req, res) {
  const user = usersService.getById(Number(req.params.id));

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  res.send(user);
}

function create(req, res) {
  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.status(400).send('"name" is required');

    return;
  }

  res.status(201).send(usersService.create(name));
}

function update(req, res) {
  const id = Number(req.params.id);

  if (!usersService.getById(id)) {
    res.status(404).send('User not found');

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.status(400).send('"name" is required');

    return;
  }

  res.send(usersService.update(id, { name }));
}

function remove(req, res) {
  const id = Number(req.params.id);

  if (!usersService.getById(id)) {
    res.status(404).send('User not found');

    return;
  }

  usersService.remove(id);

  res.sendStatus(204);
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
