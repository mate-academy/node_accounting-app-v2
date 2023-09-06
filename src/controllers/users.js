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

  res.status(200).send(users);
};

async function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await create(name);

  res.status(201).send(newUser);
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

  res.status(200).send(foundUser);
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
};

const updateUser = (req, res) => {
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

  if (!name && typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updateHaveUser = update({
    id,
    name,
  });

  res.status(200).send(updateHaveUser);
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
