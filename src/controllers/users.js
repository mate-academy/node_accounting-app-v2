'use strict';

const usersService = require('../services/users');

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const getAll = (req, res) => {
  res.send(usersService.getAll());
};

const getById = (req, res) => {
  const foundUser = usersService.getById(req.params.userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = usersService.update(userId, req.body);

  res.send(updatedUser);
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
