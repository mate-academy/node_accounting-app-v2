'use strict';

const userServices = require('../services/users.js');

function getAll(req, res) {
  const users = userServices.getAll();

  res.send(users);
}

function getById(req, res) {
  const { userId } = req.params;
  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
}

function create(req, res) {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.create(name);

  res.statusCode = 201;
  res.send(newUser);
}

function remove(req, res) {
  const { userId } = req.params;
  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.remove(userId);
  res.sendStatus(204);
}

function update(req, res) {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string' || !name) {
    res.sendStatus(400);

    return;
  }

  userServices.update(userId, name);
  res.send(foundUser);
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
