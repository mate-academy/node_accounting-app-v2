'use strict';

const userService = require('../services/userService');

const getUsers = (req, res) => {
  res.json(userService.getAll());
};

const getUser = (req, res) => {
  const id = Number(req.params.id);
  const user = userService.getById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = userService.create(name);

  res.status(201).json(user);
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = userService.update(id, name);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const deleted = userService.remove(id);

  if (!deleted) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.sendStatus(204);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
