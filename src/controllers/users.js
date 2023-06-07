'use strict';

const userService = require('../services/users');

const getAllUser = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  const regex = /^\d+$/;

  if (!regex.test(userId)) {
    res.sendStatus(400);

    return;
  }

  const user = userService.findById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.status(201).send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const regex = /^\d+$/;

  if (!regex.test(userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

const updateUserById = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const regex = /^\d+$/;

  if (!regex.test(userId)) {
    res.sendStatus(400);

    return;
  }

  const user = userService.update(userId, name);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  deleteUser,
  updateUserById,
};
