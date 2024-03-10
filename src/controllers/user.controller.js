'use strict';

const userService = require('../services/user.service');

const get = (req, res) => {
  res.send(userService.getAllUsers());
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const user = userService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newUser = userService.update({
    id, name,
  });

  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
