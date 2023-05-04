'use strict';

const usersService = require('../services/usersService');

const getAll = (req, res) => {
  const users = usersService.getAllUsers();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.removeUser(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = usersService.updateUser({
    id: userId,
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
