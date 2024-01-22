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
    res.status(404);
  }

  res.send(user);
};
const createUser = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.status(400);

    return;
  }

  const user = create(name);

  res.status(201).send(user);
};
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const findUser = getById(id);

  if (!findUser) {
    res.status(404);

    return;
  }

  if (typeof name !== 'string' || !name.length) {
    res.status(400);
  }

  const user = update(id, name);

  res.status(200);
  res.send(user);
};
const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!getById(id)) {
    res.status(404);
  }
  remove(id);
  res.status(204);
};

module.exports = {
  get,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
