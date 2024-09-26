'use strict';

const userService = require('../services/user');

const getAllUsers = (req, res) => {
  const users = userService.getUsers();

  res.json(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.json(foundUser);
};

const deleteUserById = (req, res) => {
  const { userId } = req.params;

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.removeUserById(userId);

  res.sendStatus(204);
};

const updateUserById = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const updated = userService.patchUser(foundUser, { name });

  res.json(updated);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const createdUser = userService.addUser({ name });

  res.status(201);
  res.json(createdUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  createUser,
};
