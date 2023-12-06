'use strict';

const {
  createUser,
  getById,
  getAll,
  deleteUser,
  setAll,
  changeUser,
} = require('../services/user.service');

const get = (req, res) => {
  const allUsers = getAll();

  res.send(allUsers);
};

const postOne = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = createUser(name);

  res.status(201).send(newUser);
};

const getOneById = (req, res) => {
  const { id } = req.params;

  const user = getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const deleteOne = (req, res) => {
  const { id } = req.params;

  const newUsers = deleteUser(id);

  const oldUsers = getAll();

  if (newUsers.length === oldUsers.length) {
    res.sendStatus(404);

    return;
  }

  setAll(newUsers);

  res.sendStatus(204);
};

const changedOne = (req, res) => {
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

  const changedUser = changeUser(user, name);

  res.send(changedUser);
};

module.exports = {
  get,
  postOne,
  getOneById,
  deleteOne,
  changedOne,
};
