'use strict';

const models = require('./models');

function getUsers(req, res) {
  const users = models.getUsers();

  res.send(users);
}

function getUserById(req, res) {
  const { userId } = req.params;
  const user = models.getUserById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
}

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = models.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
