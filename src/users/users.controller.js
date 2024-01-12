'use strict';

const usersController = require('./users.services');

const getAll = (req, res) => {
  res.status(200).send(usersController.getAll());
};

const getById = (req, res) => {
  const id = +req.params.id;
  const user = usersController.getByID(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersController.create(name);

  res.status(201).send(newUser);
};

const remove = (req, res) => {
  const id = +req.params.id;

  if (!usersController.getByID(id)) {
    res.sendStatus(404);

    return;
  }

  usersController.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (!usersController.getByID(id)) {
    res.sendStatus(404);

    return;
  }

  const user = usersController.update(+id, name);

  res.status(204).send(user);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
