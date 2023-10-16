'use strict';

const usersService = require('../services/users.service');

const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers();

  res.send(users);
};

const getUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.status(404).send('User Not Found');

    return;
  }

  res.send(foundUser);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Username Not Found');

    return;
  }

  const newUser = usersService.createUser(name);

  res.status(201).send(newUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.status(404).send('User Not Found');

    return;
  }

  usersService.removeUser(userId);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.status(404).send('User Not Found');

    return;
  }

  if (!name) {
    res.status(404).send('Username Not Found');
  }

  usersService.updateUser(userId, name);
  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  removeUser,
  updateUser,
};
