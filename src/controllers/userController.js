'use strict';

const userService = require('../services/users.js');

const getAllUsers = (_, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOneUser = (req, res) => {
  const userId = parseInt(req.params.userId);
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);
  }

  res.send(foundUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const newUser = userService.createUser(name);

  res.status(201).json(newUser);
  res.send();
};

const updateUser = (req, res) => {
  const userId = parseInt(req.params.userId);
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

  userService.userUpdate({
    id: userId,
    name,
  });

  res.send(foundUser);
};

const removeUser = (req, res) => {
  const userId = parseInt(req.params.userId);
  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(userId);
  res.sendStatus(204);
};

module.exports = {
  getAll: getAllUsers,
  getOneUser,
  addUser,
  updateUser,
  removeUser,
};
