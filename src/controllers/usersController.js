'use strict';

const userService = require('../services/usersServices');

function getAll(req, res) {
  const users = userService.getAll();

  res.send(users);
}

function getById(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.findById(userId);

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
  const fieldsToUpdate = req.body;

  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.update({
    userId, fieldsToUpdate,
  });

  res.send(foundUser);
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
