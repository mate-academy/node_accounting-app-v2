'use strict';

const userServise = require('../servises/users');

function getAll(req, res) {
  const users = userServise.getAll();

  res.send(users);
}

function getOne(req, res) {
  const { userId } = req.params;

  const foundUser = userServise.getById(+userId);

  if (!foundUser) {
    res.send(404);

    return;
  }

  res.send(foundUser);
}

function createUser(req, res) {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.send(400);

    return;
  }

  const newUser = userServise.create(name);

  res.statusCode = 201;
  res.send(newUser);
}

function updateUser(req, res) {
  const { userId } = req.params;
  const foundUser = userServise.getById(userId);
  const { name } = req.body;

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  userServise.update(userId, name);

  res.send(foundUser);
}

function deleteUser(req, res) {
  const { userId } = req.params;
  const foundUser = userServise.getById(+userId);

  if (!foundUser) {
    res.send(404);

    return;
  }

  userServise.remove(+userId);

  res.sendStatus(204);
}

module.exports = {
  getAll,
  getOne,
  createUser,
  deleteUser,
  updateUser,
};
