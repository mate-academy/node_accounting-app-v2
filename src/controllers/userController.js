'use strict';

const usersService = require('../services/usersService');

const getAll = (req, res) => {
  const users = usersService.getAllUsers();

  res.send(users);
};

const getUser = (req, res) => {
  const { userId } = req.params;

  if (typeof Number(userId) !== 'number') {
    res.sendStatus(400);

    return;
  }

  const requiredUser = usersService.findUserById(userId);

  if (!requiredUser) {
    res.sendStatus(404);

    return;
  }

  res.send(requiredUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const update = (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;

  const requiredUser = usersService.findUserById(userId);

  if (!requiredUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  usersService.updateUsers({
    userId, name,
  });

  res.send(requiredUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  const requiredUser = usersService.findUserById(userId);

  if (!requiredUser) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(userId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getUser,
  add,
  update,
  remove,
};
