'use strict';

const userService = require('../services/users.js');

const getAllUsers = (req, res) => {
  const users = userService.getAllUsers();

  res.send(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const createNewUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createNewUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.removeUser(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  userService.updateUser(
    {
      id: userId, name,
    });

  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  updateUser,
};
