'use strict';

const userServices = require('../servises/userServices');

function getUsers(req, res) {
  const users = userServices.getUsers();

  res.send(users);
};

function getUserById(req, res) {
  const user = userServices.getUserById(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

function createUser(req, res) {
  if (!req.body.name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.createUser(req.body.name);

  res.status(201);
  res.send(newUser);
};

function deleteUser(req, res) {
  const user = userServices.getUserById(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userServices.deleteUser(req.params.id);

  res.sendStatus(204);
};

function updateUser(req, res) {
  const user = userServices.getUserById(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!req.body.name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = userServices.updateUser(req.params.id, req.body.name);

  res.send(updatedUser);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
