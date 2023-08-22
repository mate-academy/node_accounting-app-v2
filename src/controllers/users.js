'use strict';

const userService = require('../services/users');

const getUsers = (req, res) => {
  res.send(userService.getAll());
};

const getUserById = (req, res) => {
  const userId = +req.params.userId;
  const foundUser = userService.getById(userId);

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

  const newUser = userService.create(name);

  res.status(201).send(newUser);
};

const updateUser = (req, res) => {
  const userId = +req.params.userId;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if ('id' in req.body) {
    res.sendStatus(400);

    return;
  }

  const { name } = req.body;

  userService.update({
    id: userId,
    name,
  });

  res.send(foundUser);
};

const deleteUser = (req, res) => {
  const userId = +req.params.userId;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);

  res.sendStatus(204);
};

module.exports = {
  getUsers, getUserById, createUser, updateUser, deleteUser,
};
