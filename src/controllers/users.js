'use strict';

const usersService = require('../services/users.js');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.status(200);
  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);
  }

  const foundUser = usersService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(foundUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);
  }

  const newUser = usersService.create(name);

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(userId);
  res.sendStatus(204);
};

const change = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = usersService.findById(userId);

  // if (!name || isNaN(+userId)) {
  //   res.sendStatus(400);
  // }

  if (typeof name !== 'string') {
    res.sendStatus(422);
  }

  if (!foundUser) {
    res.sendStatus(404);
  }

  usersService.change(userId, name);

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  change,
};
