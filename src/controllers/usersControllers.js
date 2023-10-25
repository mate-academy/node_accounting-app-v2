'use strict';

const usersService = require('../services/usersService');

const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers();

  res.send(users);
};

const getUserById = (req, res) => {
  const id = +req.params.id;

  const user = usersService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: +new Date(),
    name,
  };

  const user = usersService.addUser(newUser);

  res.statusCode = 201;

  res.send(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const userId = +id;

  if (!name || typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const userById = usersService.getUserById(userId);

  if (!userById) {
    res.sendStatus(404);

    return;
  }

  Object.assign(userById, { name });
  res.send(userById);
};

const removeUser = (req, res) => {
  const id = +req.params.id;

  const userById = usersService.getUserById(id);

  if (!userById) {
    res.sendStatus(404);

    return;
  }

  usersService.removeUser(id);

  res.sendStatus(204);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser,
};
