'use strict';

const {
  createUser,
  getAll,
  getById,
  updateUser,
  removeUser,
} = require('../services/users.service');

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const get = (req, res) => {
  res.send(getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  updateUser({
    id, name,
  });

  res.statusCode = 200;
  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!getById(id)) {
    res.sendStatus(404);

    return;
  }

  removeUser(id);

  res.sendStatus(204);
};

module.exports = {
  create,
  get,
  getOne,
  update,
  remove,
};
