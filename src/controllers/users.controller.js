'use strict';

const usersServise = require('../servises/users.service');

const getAll = (req, res) => {
  const users = usersServise.getAll();

  res.send(users);
};

const findUserById = (req, res) => {
  const { id } = req.params;

  const user = usersServise.getUser(id);

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

  const user = usersServise.newUser(name);

  res.statusCode = 201;
  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const user = usersServise.getUser(id);

  usersServise.removeUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersServise.getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  Object.assign(user, { name });
  res.send(user);
};

module.exports = {
  getAll,
  findUserById,
  createUser,
  deleteUser,
  updateUser,
};
