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

  addUser(name);

  res.statusCode = 201;
  res.send('Added');
}

function getUserAction(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(404);

    return;
  }

  const user = getUser(userId);

  if (!user) {
    res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(user);
}

function deleteUserAction(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(404);

    return;
  }

  deleteUser(userId);
  res.sendStatus(204);
};

function updateUserAction(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  updateUser(userId, name);

  res.sendStatus(200);
}

module.exports = {
  getAllUsersAction,
  addUserAction,
  getUserAction,
  deleteUserAction,
  updateUserAction,
};
