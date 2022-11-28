'use strict';

const { usersService } = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getUsers();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersService.getUser(userId);

  if (!userId) {
    res.sendStatus(400);

    return;
  }

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

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = usersService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  usersService.updateUser(userId, name);

  res.send(foundUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(userId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
