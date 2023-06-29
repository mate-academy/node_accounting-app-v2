'use strict';

const usersService = require('../services/users');

function getUsers(req, res) {
  const users = usersService.getUsers();

  res.send(users);
}

function getUserById(req, res) {
  const { userId } = req.params;

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
}

function removeUser(req, res) {
  const { userId } = req.params;

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.removeUser(userId);
  res.sendStatus(204);
}

function addUser(req, res) {
  const userName = req.body;

  if (!userName) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.addUser(userName);

  res.statusCode = 201;
  res.send(newUser);
}

function updateUser(req, res) {
  const { userId } = req.params;
  const { userName } = req.body;

  const foundUser = usersService.getbyId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof userName !== 'string') {
    res.status(422);

    return;
  }

  const updatedUser = usersService.updateUser(userId, userName);

  res.statusCode = 200;
  res.send(updatedUser);
};

module.exports = {
  getUsers,
  getUserById,
  removeUser,
  addUser,
  updateUser,
};
