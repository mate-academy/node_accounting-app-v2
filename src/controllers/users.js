'use strict';

const userService = require('../services/users');

const getAllUsers = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.status(201);
  res.send(newUser);
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  userService.update({
    id: userId,
    name,
  });

  res.send(foundUser);
};

module.exports = ({
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
});
