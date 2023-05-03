'use strict';

const userServices = require('../services/users');

const getAll = (req, res) => {
  const users = userServices.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getById(userId);

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
  }

  const newUser = userServices.create(name);

  res.status(201);
  res.json(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;
  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  userServices.update({
    id: userId,
    name: name,
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
