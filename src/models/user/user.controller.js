'use strict';

const userService = require('./user.service');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const getById = (req, res) => {
  const id = +req.params.id;

  const user = userService.getOne(id);

  if (!user) {
    res.status(404).end();

    return;
  }

  res.send(user);
};

const remove = (req, res) => {
  const id = +req.params.id;

  const user = userService.getOne(id);

  if (!user) {
    res.status(404).end();

    return;
  }

  userService.remove(id);

  res.status(204).end();
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).end();

    return;
  }

  const newUser = userService.create({ name });

  res.status(201).send(newUser);
};

const update = (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (!name) {
    res.status(400).end();

    return;
  }

  const user = userService.getOne(id);

  if (!user) {
    res.status(404).end();

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
