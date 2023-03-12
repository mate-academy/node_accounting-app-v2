'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  };

  const newUser = usersService.create(name);

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    res.status(404);

    return;
  };

  usersService.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = usersService.getById(userId);

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  if (!foundUser) {
    res.status(404);
  }

  const updatedUser = usersService.update(userId, name);

  res.status(200);
  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
