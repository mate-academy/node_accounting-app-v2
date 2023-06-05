'use strict';

const userService = require('../services/users.js');

function getAll(req, res) {
  const users = userService.getAll();

  res.send(users);
}

function getById(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
}

function create(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
}

function update(req, res) {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = userService.getById(userId);

  Object.assign(foundUser, { name });

  userService.update({
    id: userId, name,
  });

  res.send(foundUser);
}

function remove(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.statusCode = 204;
  res.send();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
