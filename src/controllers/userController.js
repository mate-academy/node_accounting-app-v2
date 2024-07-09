'use strict';

const userService = require('../services/userService');

function createUser(req, res) {
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).send('Name or email are required');
  }

  const newUser = userService.createUser(name, email);

  res.status(201).json(newUser);
}

function getAllUsers(req, res) {
  const users = userService.getAllUsers(req.query);

  res.json(users);
}

function getUser(req, res) {
  const [user] = userService.getAllUsers({ id: parseInt(req.params.id) });

  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
}

function updateUser(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(404).send('Name is required');
  }

  const user = userService.updateUser(parseInt(req.params.id), name);

  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
}

function deleteUser(req, res) {
  const success = userService.deleteUser(parseInt(req.params.id));

  if (!success) {
    return res.status(404).send('User not found');
  }
  res.status(204).send();
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
