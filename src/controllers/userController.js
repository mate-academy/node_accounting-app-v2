'use strict';

const userService = require('../services/userService');

function getAllUser(_, res) {
  const allUsers = userService.getAllUsers();

  res.send(allUsers);
}

function getUserById(req, res) {
  const { userId } = req.params;

  if (!userId) {
    return res.sendStatus(400);
  }

  const user = userService.getByUserId(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(user);
}

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = userService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
}

function deleteUser(req, res) {
  const { userId } = req.params;
  const user = userService.getByUserId(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  userService.deleteUser(userId);
  res.sendStatus(204);
}

function updateUser(req, res) {
  const { userId } = req.params;
  const user = userService.getByUserId(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  userService.updateUser(userId, name);
  res.statusCode = 200;
  res.send(user);
}

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
