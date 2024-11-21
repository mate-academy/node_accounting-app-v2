'use strict';

const usersService = require('../services/users');

const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers();

  res.send(users);
};

const getOneUser = (req, res) => {
  const { userId } = req.params;

  const searchedUser = usersService.getUserById(+userId);

  if (!searchedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(searchedUser);
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

  const searchedUser = usersService.getUserById(+userId);

  if (!searchedUser) {
    res.sendStatus(404);

    return;
  }

  usersService.removeUser(+userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const searchedUser = usersService.getUserById(+userId);

  if (!searchedUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  usersService.updateUser(name, +userId);

  res.send(searchedUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  removeUser,
  updateUser,
};
