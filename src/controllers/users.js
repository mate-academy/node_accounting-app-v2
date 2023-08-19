'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAllUsers();

  res.send(users);
};

const getUser = (req, res) => {
  const { userId } = req.params;

  const foundedUser = usersService.getUserById(Number(userId));

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedUser);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.createUser(name);

  res.status(201).send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  const foundedUser = usersService.getUserById(Number(userId));

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(Number(userId));
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundedUser = usersService.getUserById(Number(userId));

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  usersService.updateUser(Number(foundedUser.id), name);

  res.send(foundedUser);
};

module.exports = {
  getAll,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
