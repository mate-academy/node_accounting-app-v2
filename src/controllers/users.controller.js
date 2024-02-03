'use strict';

const {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../services/users.serveces');

const getAllUsers = (req, res) => {
  res.sendStatus(200);
  res.send(getUsers());
};

const createOneUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
    res.message = 'The name is invalid';

    return;
  }

  const user = createUser(name);

  res.sendStatus(201);

  res.send(user);
};

const getOneUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
    res.message = 'The id is invalid';

    return;
  }

  const user = getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(200);
  res.send(user);
};

const deleteOneUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
    res.message = 'The id is invalid';

    return;
  }

  const user = getUser(id);

  if (!user) {
    res.sendStatus(404);

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
    res.message = 'The id is invalid';

    return;
  }

  const user = getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);
    res.message = 'The name is invalid';

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
