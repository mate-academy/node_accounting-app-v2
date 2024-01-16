'use strict';

const { findUsers,
  createUser,
  findUser,
  removeUser } = require('../services/users.services');

const getUsers = (req, res) => {
  const users = findUsers();

  res.status(200).send(users);
};

const getUser = (req, res) => {
  const { id } = req.params;
  const idToNum = Number(id);

  if (isNaN(idToNum) || idToNum <= 0 || !isFinite(idToNum)) {
    res.sendStatus(400);

    return;
  }

  const user = findUser(idToNum);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.status(200).send(user);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = createUser(name);

  res.status(201).send(user);
};

const patchUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const idToNum = Number(id);

  if (isNaN(idToNum) || idToNum <= 0 || !isFinite(idToNum) || !name) {
    res.sendStatus(400);

    return;
  }

  const user = findUser(idToNum);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  Object.assign(user, { name });

  res.status(200).send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const idToNum = Number(id);

  if (isNaN(idToNum) || idToNum <= 0 || !isFinite(idToNum)) {
    res.sendStatus(400);

    return;
  }

  const user = findUser(idToNum);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  removeUser(idToNum);

  res.sendStatus(204);
};

module.exports = {
  getUser,
  getUsers,
  addUser,
  patchUser,
  deleteUser,
};
