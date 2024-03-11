'use strict';

const { findUser } = require('../services');

let users = [];

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newUser = {
    id: users.length + 1, name,
  };

  users.push(newUser);
  res.status(201).json(newUser);
}

function getUsers(req, res) {
  res.send(users);
}

function getUser(req, res) {
  const { userId } = req.params;

  const user = findUser(userId, users);

  if (!user) {
    return res.status(404).send('User not found');
  }

  return res.status(200).send(user);
}

function updateUser(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  const updatedUser = users.find(user => +user.id === +userId);

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  updatedUser.name = name;

  return res.status(200).send(updatedUser);
}

function deleteUser(req, res) {
  const { userId } = req.params;

  if (!users.some(user => +user.id === +userId)) {
    res.sendStatus(404);

    return;
  }

  users = users.filter(user => +user.id !== +userId);

  res.sendStatus(204);
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  users,
};
