'use strict';

const express = require('express');
const { getNewId } = require('../helpers');
const router = express.Router();

let users = [];

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const foundUser = users.find(user => user.id === Number(userId));

  if (!foundUser) {
    res.status(404).send('User not found');

    return;
  }

  res.send(foundUser);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(422).send('All input fields are required');

    return;
  }

  if (typeof name !== 'string') {
    res.status(422).send('Incorrect Data Format');

    return;
  }

  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  res.status(201).send(newUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  const filteredUsers = users.filter(user => user.id !== Number(userId));

  if (filteredUsers.length === users.length) {
    res.sendStatus(404).send(`Unable to delete user with id: ${userId}`);

    return;
  }

  users = filteredUsers;
  res.sendStatus(204);
});

router.patch('/:userId', (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;
  const findUser = users.find(user => user.id === Number(userId));

  if (typeof name !== 'string') {
    res.status(422).send('Incorrect Data Format');

    return;
  }

  Object.assign(findUser, { name });
  res.send(findUser);
});

module.exports = {
  router,
  users,
};
