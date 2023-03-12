'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getUser = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.removeUserById(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const isValidParams = !name || typeof name !== 'string';

  if (!userId || isValidParams) {
    res.sendStatus(400);

    return;
  }

  const hasUser = usersService.getUserById(userId);

  if (!hasUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = usersService.updateUser(userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getUser,
  createUser,
  removeUser,
  update,
};
