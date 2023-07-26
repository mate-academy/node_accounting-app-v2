'use strict';

const { UserService } = require('../services/users.service');

const getAllUsers = (req, res) => {
  const userService = new UserService();
  const users = userService.findAll();

  res.send(users);
};

const getOneUser = (req, res) => {
  const userService = new UserService();

  const { userId } = req.params;
  const user = userService.findById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const addUser = (req, res) => {
  const { name } = req.body;

  const userService = new UserService();

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const userService = new UserService();
  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const userService = new UserService();
  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  userService.update({
    id: userId,
    name,
  });

  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  removeUser,
  updateUser,
};
