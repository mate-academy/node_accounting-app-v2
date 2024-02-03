'use strict';

const {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../services/users.serveces');

const getAllUsers = (req, res) => {
  res.statusCode(200);
  res.send(getUsers());
};

const createOneUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const todo = createUser(name);

  res.statusCode(201);

  res.send(todo);
};

const getOneUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const user = getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode(200);
  res.send(user);
};

const deleteOneUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(404);

    return;
  }

  const user = getUser(id);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  deleteUser(id);

  res.sendStatus(204);
};

const updateOneUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = updateUser({
    id,
    name,
  });

  res.sendStatus(200);
  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  createOneUser,
  getOneUser,
  deleteOneUser,
  updateOneUser,
};
