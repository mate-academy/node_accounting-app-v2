'use strict';

const userService = require('../services/user.service.js');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { parsedId } = req;

  const user = userService.getById(parsedId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = userService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const remove = (req, res) => {
  const { parsedId } = req;

  const user = userService.getById(parsedId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.remove(parsedId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { parsedId } = req;
  const { name } = req.body;

  const user = userService.getById(parsedId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedTodo = userService.update({
    parsedId,
    name,
  });

  res.send(updatedTodo);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
