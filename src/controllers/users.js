'use strict';

const userServise = require('../services/users.js');

function add(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServise.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

function getAll(req, res) {
  const users = userServise.getAll();

  res.send(users);
  res.statusCode = 200;
};

function getUserById(req, res) {
  const userId = Number(req.params.id);
  const foundUser = userServise.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus = 200;
  res.send(foundUser);
};

function remove(req, res) {
  const userId = Number(req.params.id);
  const foundUser = userServise.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServise.removeUser(userId);
  res.sendStatus(204);
};

function update(req, res) {
  const userId = Number(req.params.id);
  const foundUser = userServise.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  const { name } = req.body;

  userServise.updateUser({
    userId, name,
  });
  res.send(foundUser);
};

module.exports = {
  add,
  getAll,
  getUserById,
  update,
  remove,
};
