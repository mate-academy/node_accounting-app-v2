'use strict';

const usersServises = require('../services/users');

const getAll = (req, res) => {
  const users = usersServises.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersServises.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.send({});

    return;
  }

  const newUser = usersServises.create(name);

  res.statusCode = 201;

  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersServises.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersServises.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersServises.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  usersServises.update({
    id: userId,
    name,
  });

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
