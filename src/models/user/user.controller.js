'use strict';

const userService = require('./user.service');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const getById = (req, res) => {
  const id = +req.params.id;

  const user = userService.getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const remove = (req, res) => {
  const id = +req.params.id;

  const user = userService.getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);

  res.sendStatus(204);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create({ name });

  res.status(201).send(newUser);
};

const update = (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.update({
    id, name,
  });

  res.status(200).send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
