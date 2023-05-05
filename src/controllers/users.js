'use strict';

const {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../services/usersServer');

function getAllUsersAction(req, res) {
  const users = getAllUsers();

  res.send(users);
};

function addUserAction(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = addUser(name);

  res.statusCode = 201;
  res.send(user);
}

function getUserAction(req, res) {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(404);

    return;
  }

  const user = getUser(id);

  if (!user) {
    res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(user);
}

function deleteUserAction(req, res) {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(404);

    return;
  }

  deleteUser(id);
  res.sendStatus(204);
};

function updateUserAction(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  updateUser(id, name);

  res.sendStatus(200);
}

module.exports = {
  getAllUsersAction,
  addUserAction,
  getUserAction,
  deleteUserAction,
  updateUserAction,
};
