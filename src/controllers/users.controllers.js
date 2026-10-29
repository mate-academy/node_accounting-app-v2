'use strict';

const usersService = require('../services/users.service');

function getAll(req, res) {
  res.json(usersService.getAll());
}

function getById(req, res) {
  const id = Number(req.params.id);
  const foundUser = usersService.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.json(foundUser);
}

function create(req, res) {
  if (!req.body.name) {
    res.sendStatus(400);

    return;
  }

  const createdUser = usersService.create(req.body.name);

  res.status(201).json(createdUser);
}

function update(req, res) {
  const id = Number(req.params.id);

  if (!req.body.name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = usersService.update(id, req.body.name);

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.json(updatedUser);
}

function remove(req, res) {
  const id = Number(req.params.id);

  const isRemoved = usersService.remove(id);

  if (!isRemoved) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
