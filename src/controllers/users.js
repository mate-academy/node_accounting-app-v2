'use strict';

const usersService = require('../services/users.js');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const getUsersById = usersService.getById(userId);

  if (!getUsersById) {
    res.sendStatus(404);

    return;
  }

  res.send(getUsersById);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const getUsersById = usersService.getById(userId);

  if (!getUsersById) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const getUsersById = usersService.getById(userId);

  if (!getUsersById) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name && typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = usersService.update({
    id: userId,
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
