'use strict';

const userService = require('../services/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = userService.create(req.body);

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  userService.remove(userId);
  res.sendStatus(204);
};

const change = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  if (!name) {
    return res.sendStatus(400);
  }

  userService.update(userId, req.body);
  res.send(foundUser);
};

const reset = () => userService.reset();

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  change,
  reset,
};
