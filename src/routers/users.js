'use strict';

const express = require('express');
const { getNewId } = require('../helpers');
const router = express.Router();

let users = [];

function setInitialUsers() {
  users = [];
}

const filterUsers = (userId) => (
  users.filter(user => Number(userId) !== user.id)
);

const getUserById = (userId) => {
  return users.find(user => user.id === Number(userId));
};

router.get('/', (req, res) => {
  res.status(200);
  res.json(users);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  const userById = getUserById(userId);

  if (!userById) {
    res.status(404).send({ message: 'Expected entity doesn/t exist.' });

    return;
  }
  res.status(200);
  res.json(userById);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: 'Required parameter is not passed' });

    return;
  }

  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);
  res.status(201);
  res.json(newUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  const filteredUser = filterUsers(userId);

  if (users.length === filteredUser.length) {
    res.status(404).send({ message: 'Expected entity doesn/t exist.' });

    return;
  }

  users = filteredUser;

  res.sendStatus(204);
});

router.patch('/:userId', (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const userById = getUserById(userId);

  if (!userById) {
    res.status(404).send({ message: 'Expected entity doesn/t exist.' });

    return;
  }

  if (!name) {
    res.status(400).send({ message: 'Required parameter is not passed' });

    return;
  }

  const editedUser = Object.assign(userById, { name });

  res.status(200);
  res.json(editedUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  users = filterUsers(userId);

  const userById = getUserById(userId);

  if (!userById) {
    res.status(404).send({ message: 'Expected entity doesn/t exist.' });

    return;
  }

  res.sendStatus(204);
});

module.exports = {
  setInitialUsers,
  router,
  users,
  getUserById,
};
