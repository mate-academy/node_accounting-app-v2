'use strict';

const usersServices = require('../services/users');

const getAll = (_, res) => {
  const users = usersServices.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const foundUser = usersServices.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersServices.create(name);

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const foundUser = usersServices.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersServices.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const foundUser = usersServices.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const name = req.body.name;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  usersServices.update({
    id,
    name,
  });
  res.status(200).send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
