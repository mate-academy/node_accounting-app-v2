'use strict';

const userServise = require('../services/users');

const getAll = (req, res) => {
  const users = userServise.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  const foundUser = userServise.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServise.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServise.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  userServise.update({
    id: userId,
    name,
  });

  res.send(foundUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServise.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServise.remove(userId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  add,
  getOne,
  update,
  remove,
};
