'use strict';

const userService = require('../services/users');

const getUsers = (req, res) => {
  const users = userService.getUsers();

  res.send(users);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(+userId);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUserById(+userId);

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
    userId, name,
  });

  res.statusCode = 200;
  res.send(foundUser);
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
