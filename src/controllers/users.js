'use strict';

const userService = require('../services/users');

function getAllUsers(req, res) {
  const users = userService.getAllUsers();

  res.send(users);
};

function getUserById(req, res) {
  const { userId } = req.params;

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  res.send(foundUser);
};

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  };

  const newUser = userService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

function removeUser(req, res) {
  const { userId } = req.params;

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  userService.removeUser(userId);

  res.sendStatus(204);
};

function updateUser(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  userService.updateUser(userId, name);

  res.statusCode = 200;
  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
