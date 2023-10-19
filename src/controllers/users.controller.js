'use strict';

const userService = require('../services/users.services');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const user = userService.getById(Number(req.params.id));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const userId = Number(new Date());

  const newUser = userService.create(userId, name);

  res.statusCode = 201;

  res.send(newUser);
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!id || !name || !userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.update(id, name);

  res.statusCode = 200;
  res.send(updatedUser);
};

const remove = (req, res) => {
  const id = Number(req.params.id);

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
