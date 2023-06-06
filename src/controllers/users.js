'use strict';

const userService = require('../services/users');

const getAllUser = (req, res) => {
  const users = userService.getAllUsers();

  res.send(users);
};

const getOneUser = (req, res) => {
  const { userId } = req.params;
  const regex = /^\d+$/;

  if (!regex.test(userId)) {
    res.sendStatus(400);

    return;
  }

  const user = userService.findUserById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const addUser = (req, res) => {
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
  const { userId } = req.params;
  const regex = /^\d+$/;

  if (!regex.test(userId)) {
    res.sendStatus(400);

    return;
  }

  const foundTodo = userService.findUserById(userId);

  if (!foundTodo) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const regex = /^\d+$/;

  if (!regex.test(userId)) {
    res.sendStatus(400);

    return;
  }

  const user = userService.updateUser(userId, name);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

module.exports = {
  getAllUser,
  getOneUser,
  addUser,
  deleteUser,
  updateUser,
};
