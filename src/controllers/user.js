'use strict';

const userService = require('../services/user');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    return res.sendStatus(400);
  }

  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  res.send(foundUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = userService.addUser(name);

  res.status(201).send(user);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  userService.removeUser(+userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name || !userId) {
    return res.sendStatus(400);
  }

  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  const updatedUser = userService.updateUser(+userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  addUser,
  getOne,
  removeUser,
  updateUser,
};
