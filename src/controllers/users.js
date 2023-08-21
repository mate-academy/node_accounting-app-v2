'use strict';

const userServises = require('../services/users.service');

const getUsers = (req, res) => {
  const users = userServises.getAll();

  res.send(users);
};

const getUser = (req, res) => {
  const { id } = req.params;
  const foundUser = userServises.getById(id);

  if (!foundUser) {
    res.sendStatus(404).send('User not found');

    return;
  }

  res.send(foundUser);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServises.add({ name });

  res.statusCode = 201;
  res.send((newUser));
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const foundUser = userServises.getById(id);

  if (!foundUser) {
    res.sendStatus(404).send('User not found');

    return;
  }

  userServises.remove(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const foundUser = userServises.getById(id);

  if (!foundUser) {
    res.sendStatus(404).send('User not found');

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.send(400);

    return;
  }

  const updatedUser = userServises.update(id, { name });

  res.send(updatedUser);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
