'use strict';

const { getUsers, getUserById, createUser } = require('../models');

function getUsersController(req, res) {
  const users = getUsers();

  res.json(users);
}

function getUserByIdController(req, res) {
  const { userId } = req.params;
  const user = getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}

function createUserController(req, res) {
  const { name } = req.body;
  const newUser = createUser(name);

  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(400).json({ error: 'Failed to create user' });
  }
}

module.exports = {
  getUsers: getUsersController,
  getUserById: getUserByIdController,
  createUser: createUserController,
};
