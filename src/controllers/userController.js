'use strict';

const userServices = require('../services/userServices');

function getAllUsers(req, res) {
  const allUsers = userServices.getAllUsers();

  res.send(allUsers);
}

function getUserById(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const user = userServices.getByUserId(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
}

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
}

function deleteUser(req, res) {
  const { userId } = req.params;

  const foundUser = userServices.getByUserId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.deleteUser(userId);
  res.sendStatus(204);
}

function updateUser(req, res) {
  const { userId } = req.params;
  const user = userServices.getByUserId(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  userServices.updateUser(userId, name);
  res.statusCode = 200;
  res.send(user);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
