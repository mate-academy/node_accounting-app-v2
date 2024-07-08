'use strict';

const userService = require('../services/user.services');

const getAllUsers = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    return res.status(404).send({ error: 'User not found.' });
  }

  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ error: 'Name is required.' });
  }

  const newUser = userService.create(name);

  res.status(201).send(newUser);
};

const removeUserById = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (!user) {
    return res.status(404).send({ error: 'User not found.' });
  }

  userService.removeById(id);
  res.sendStatus(204);
};

const updateUserById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!user) {
    return res.status(404).send({ error: 'User not found.' });
  }

  if (!name) {
    return res.status(400).send({ error: 'Name is required.' });
  }

  const updatedUser = userService.updateById(id, name);

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  removeUserById,
};
