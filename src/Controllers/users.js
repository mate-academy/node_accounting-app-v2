'use strict';

const userService = require('../Services/users');

const getAll = (req, res) => {
  const allUsers = userService.getAll();

  res.json(allUsers);
};

const add = (req, res) => {
  const { name } = req.body;

  if (name) {
    const newUser = userService.createUser(name);

    res.status(201).json(newUser);
  } else {
    res.status(400).send('Invalid input');
  }
};

const getUser = (req, res) => {
  const userId = req.params.userId;
  const user = userService.getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
};

const remove = (req, res) => {
  const userId = req.params.userId;
  const user = userService.getUserById(userId);

  if (user) {
    userService.removeUser(userId);
    res.status(204).send('User removed');
  } else {
    res.status(404).send('User not found');
  }
};

const update = (req, res) => {
  const userId = req.params.userId;
  const { name } = req.body;
  const user = userService.getUserById(userId);

  if (user) {
    const updatedUser = userService.updateUser(userId, name);

    res.json(updatedUser);
  } else {
    res.status(404).send('User not found');
  }
};

module.exports = {
  getAll,
  add,
  getUser,
  remove,
  update,
};
