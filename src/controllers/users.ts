'use strict';

const usersService = require('../services/users');

const getAllUsers = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  const foundUsers = usersService.getById(userId);

  if (!foundUsers) {
    res.sendStatus(404);
    return;
  }

  res.send(foundUsers);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
    return;
  }

  const newUser = usersService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);
    return;
  }

  usersService.deleteUser(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.update(userId, name);
  res.send(foundUser);
};

module.exports = {
  getAll,
  getUserById,
  addUser,
  removeUser,
  updateUser,
};
