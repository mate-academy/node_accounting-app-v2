'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersService.getById(+userId);

  if (!foundUser) {
    return res.sendStatus(404);
  };

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersService.getById(+userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  usersService.remove(+userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = usersService.getById(+userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  if (!name) {
    return res.status(422);
  }

  usersService.update(+userId, name);

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
