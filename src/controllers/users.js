'use strict';

const userService = require('../services/users');

const getAllUsers = (req, res) => {
  const users = userService.getAllUsers();

  res.send(users);
};

const getOneUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.findUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  res.status(201);
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.findUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.removeUser(Number(userId));
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.findUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  userService.updateUser({
    id: Number(userId),
    name,
  });

  res.status(200);
  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  removeUser,
  updateUser,
};
