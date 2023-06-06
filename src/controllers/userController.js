'use strict';

const userServices = require('../services/userServices');

function getUsers(req, res) {
  const users = userServices.getUsers();

  res.send(users);
};

function getUserById(req, res) {
  const { id } = req.params;
  const user = userServices.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.createUser(name);

  res.status(201);
  res.send(newUser);
};

function deleteUser(req, res) {
  const { id } = req.params;
  const user = userServices.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userServices.deleteUser(id);

  res.sendStatus(204);
};

function updateUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const user = userServices.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = userServices.updateUser(id, name);

  res.send(updatedUser);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
