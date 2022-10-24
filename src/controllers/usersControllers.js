'use strict';

const userService = require('../services/userServices.js');

const getAllUsers = (req, res) => {
  const users = userService.getUsers();

  res.send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const foundUser = userService.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const foundUser = userService.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const foundUser = userService.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updated = userService.updateUser(id, name);

  res.send(updated);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
