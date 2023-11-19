'use strict';

const {
  getAll,
  getOne,
  create,
  remove,
  update,
} = require('../services/users.service');

const getAllUsers = (req, res) => {
  const users = getAll();

  res.send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  remove(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  const user = getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = update(id, name);

  res.setHeader('content-type', 'application/json');
  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
