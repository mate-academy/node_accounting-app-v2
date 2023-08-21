'use strict';

const userServices = require('../services/users');

function getAll(req, res) {
  const users = userServices.getAll();

  res.send(users);
}

function getById(req, res) {
  const { id } = req.params;
  const foundUser = userServices.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
}

function remove(req, res) {
  const { id } = req.params;
  const users = userServices.getAll();
  const filteredUsers = userServices.remove(id);

  if (filteredUsers.length === users.length) {
    res.sendStatus(404);

    return;
  }

  userServices.setFilteredUsers(filteredUsers);
  res.sendStatus(204);
}

function create(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.create(name);

  res.statusCode = 201;
  res.send(newUser);
}

function update(req, res) {
  const { id } = req.params;
  const foundUser = userServices.getById(id);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  Object.assign(foundUser, { name });
  res.send(foundUser);
}

module.exports = {
  getAll, getById, remove, create, update,
};
