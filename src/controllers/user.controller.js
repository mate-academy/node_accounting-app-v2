'use strict';

const userService = require('../services/user.service');

function getAll(req, res) {
  const users = userService.getAll();

  res.send(users);
}

function findById(req, res) {
  const { userId } = req.params;
  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
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

function remove(req, res) {
  const { userId } = req.params;
  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
}

function update(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userService.update(userId, name);

  res.statusCode = 200;
  res.send(updatedUser);
}

module.exports = {
  getAll,
  findById,
  create,
  remove,
  update,
};
