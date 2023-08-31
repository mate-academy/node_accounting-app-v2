'use strict';

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require('../services/usersServices.js');

const getUsers = (req, res) => {
  const users = getAll();

  res.sendStatus(200);
  res.end(users);
};

const createUser = (req, res) => {
  const { name } = req.body;

  process.stdout.write(name);

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = create(name);

  res.sendStatus(201);
  res.end(newUser);
};

const getUser = (req, res) => {
  const { id } = req.params;

  if (!Number(id)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(200);
  res.end(foundUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!Number(id)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  remove(id);
  res.sendStatus(204);
  res.end();
};

const updateUser = (res, req) => {
  const { id } = req.params;

  if (!Number(id)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  update({
    id, name,
  });
  res.sendStatus(200);
  res.end();
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
