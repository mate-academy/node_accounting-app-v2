'use strict';

const userService = require('../services/user.service');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const searchedUser = userService.getById(id);

  if (!searchedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(searchedUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userService.update({
    id, name,
  });

  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
