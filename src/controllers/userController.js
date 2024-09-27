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

  res.status(200);
  res.send(user);
}

function create(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.create(name);

  res.status(201);
  res.send(newUser);
}

function remove(req, res) {
  const { userId } = req.params;

  const foundUser = userServices.getByUserId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.remove(userId);
  res.sendStatus(204);
}

function update(req, res) {
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

  userServices.update(userId, name);
  res.status(200);
  res.send(user);
}

module.exports = {
  getAllUsers,
  getUserById,
  create,
  remove,
  update,
};
