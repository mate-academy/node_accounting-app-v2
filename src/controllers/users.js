'use strict';

const usersServices = require('../services/users.js');

function getAll(req, res) {
  const users = usersServices.getAll();

  res.send(users);
}

function getById(req, res) {
  const { userId } = req.params;
  const foundUser = usersServices.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
}

function add(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersServices.create(name);

  res.statusCode = 201;
  res.send(newUser);
}

function remove(req, res) {
  const { userId } = req.params;
  const filteredUser = usersServices.getOne(userId);

  if (!filteredUser) {
    res.sendStatus(404);

    return;
  }

  usersServices.remove(userId);

  res.sendStatus(204);
}

function update(req, res) {
  const { userId } = req.params;
  const foundUser = usersServices.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(404);
  }

  usersServices.update(userId, name);

  res.send(foundUser);
}

module.exports = {
  getAll, getById, add, remove, update,
};
