'use strict';

const userService = require('../services/servicesUsers.js');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus = 200;
  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.end('User not found');

    return;
  }

  userService.remove(userId);

  res.sendStatus(204).send();
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;

    return;
  }

  const { name } = req.body;

  const updatedUser = userService.update(userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll, getOne, add, remove, update,
};
