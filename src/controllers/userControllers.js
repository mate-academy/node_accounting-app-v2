'use strict';

const { getAll, getById, create, update, remove }
  = require('../services/usersService');

const get = (req, res) => {
  res.send(getAll());
};
const getUser = (req, res) => {
  const { id } = req.params;
  const user = getById(id);

  if (!user) {
    res.sendStatus(404);
  }

  res.send(user);
};
const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = create(name);

  res.statusCode(201);
  res.send(user);
};
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const findUser = getById(id);

  if (!findUser) {
    res.sendStatus(422);

    return;
  }

  if (typeof name !== 'string' || !name.length) {
    res.sendStatus(422);
  }

  const user = update(id, name);

  res.send(user);
};
const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!getById(id)) {
    res.sendStatus(404);
  }
  remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
