'use strict';

const { userServices } = require('../services/userServices.js');

function getUsers(req, res) {
  res.send(userServices.getUsers());
}

function getUserById(req, res) {
  const { id } = req.params;
  const searchId = +id;

  const userResult = userServices.getUser(searchId);

  if (!userResult) {
    res.sendStatus(404);

    return;
  }
  res.send(userResult);
}

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  let id = userServices.getId();

  if (id === -Infinity) {
    id = 0;
  }

  const user = {
    id,
    name,
  };

  userServices.createUser(user);
  res.statusCode = 201;
  res.send(user);
}

function updateUser(req, res) {
  const { id } = req.params;
  const searchId = +id;
  const { name } = req.body;

  const index = userServices.userIndex(searchId);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  res.send(userServices.updateUserName(index, name));
}

function deleteUser(req, res) {
  const { id } = req.params;
  const searchId = +id;

  const index = userServices.userIndex(searchId);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  userServices.deleteUser(index);
  res.sendStatus(204);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
