'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const findUserById = (req, res) => {
  const { userId } = req.params;
  const wantedUser = usersService.findUserById(userId);

  if (!wantedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(wantedUser);
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
  const { userId } = req.params;
  const { name } = req.body;
  const wantedUser = usersService.findUserById(userId);

  if (!wantedUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  usersService.patchUser(wantedUser, name);

  res.send(wantedUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const userToDelete = usersService.findUserById(userId);

  if (!userToDelete) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(userId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  findUserById,
  add,
  update,
  remove,
};
