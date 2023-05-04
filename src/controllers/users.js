'use strict';

const {
  getAll,
  addUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../services/usersServer');

function getAllAction(req, res) {
  const users = getAll();

  res.send(users);
};

function addUsersAction(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  addUser(name);

  res.statusCode = 201;
  res.send('Added');
}

function getUserAction(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(422);

    return;
  }

  const user = getUser(userId);

  if (!user.length) {
    res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(user);
}

function deleteUserAction(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(422);

    return;
  }

  deleteUser(userId);
  res.sendStatus(200);
};

function updateUserAction(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  if (!getAll().filter(el => el.id === userId).length) {
    res.sendStatus(404);

    return;
  }

  updateUser(userId, name);

  res.sendStatus(200);
}

module.exports = {
  getAllAction,
  addUsersAction,
  getUserAction,
  deleteUserAction,
  updateUserAction,
};
