'use strict';

const usersController = require('./users.services');

const getAll = (req, res) => {
  res.send(usersController.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = usersController.getByID(+id);

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

    return;
  }

  const newUser = usersController.create(name);

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!usersController.getByID(+id)) {
    res.sendStatus(404);

    return;
  }

  usersController.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (!usersController.getByID(+id)) {
    res.sendStatus(404);

    return;
  }

  const user = usersController.update(+id, name);

  res.send(user);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
