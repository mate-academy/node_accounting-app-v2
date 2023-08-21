'use strict';

const usersService = require('../services/users.js');

const getAllUsers = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersService.getById(+userId);

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

  const newUser = usersService.create(name);

  res.status(201).send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  if (!usersService.getById(+userId)) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(+userId);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = usersService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  usersService.update(+userId, name);

  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
