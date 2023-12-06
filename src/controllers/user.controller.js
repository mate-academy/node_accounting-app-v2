'use strict';

const {
  createUser,
  getByUserId,
  getAll,
  deleteUser,
  setAll,
  updateUser,
} = require('../services/user.service');

const get = (req, res) => {
  const users = getAll();

  res.send(users);
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

  const user = getByUserId(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const deleteOne = (req, res) => {
  const { id } = req.params;

  const newUsers = deleteUser(id);

  const users = getAll();

  if (newUsers.length === users.length) {
    res.sendStatus(404);

    return;
  }

  setAll(newUsers);

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = getByUserId(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = updateUser(user, name);

  res.send(updatedUser);
};

module.exports = {
  get,
  postOne,
  getOneById,
  deleteOne,
  updateOne,
};
