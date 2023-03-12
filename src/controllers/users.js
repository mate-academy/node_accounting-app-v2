'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getAOne = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const create = (req, res) => {
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

  const foundUser = usersService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(+userId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);
  }

  const foundUser = usersService.update(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  Object.assign(foundUser, { name });

  res.send(foundUser);
};

module.exports = {
  create,
  remove,
  getAll,
  getAOne,
  update,
};
