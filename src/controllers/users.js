'use strict';

const usersService = require('../services/usersService');

function getAllUsers(req, res) {
  const users = usersService.getAllUsers();

  res.send(users);
}

function getOneUser(req, res) {
  const { userId } = req.params;

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.end('User is not found');

    return;
  }

  res.send(foundUser);
}

function addUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.send('"Name field" is require');

    return;
  }

  const newUser = usersService.addOne(name);

  res.statusCode = 201;
  res.send(newUser);
}

function removeUser(req, res) {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.send('User is not found');

    return;
  }

  usersService.removeUser(userId);

  res.sendStatus(204);
}

function updateUser(req, res) {
  const { userId } = req.params;
  const { name: newUserName } = req.body;

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.send('User is not found');

    return;
  }

  if (!newUserName || typeof newUserName !== 'string') {
    res.statusCode = 400;

    res.send('"Name" field is required');

    return;
  }

  const updatedUser = usersService.updateUser(userId, newUserName);

  res.send(updatedUser);
}

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  removeUser,
  updateUser,
};
