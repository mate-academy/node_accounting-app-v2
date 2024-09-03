'use strict';

const express = require('express');
const router = express.Router();
const { getNewId } = require('../helpers');

let users = [];

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).send({
      error: 'Wrong user id!',
    });

    return;
  }

  const foundUser = users.find(user => user.id === +userId);

  if (!foundUser) {
    res.sendStatus(404).send({
      error: 'User not found!',
    });

    return;
  }

  res.json(foundUser);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send({
      error: 'Wrong user name!',
    });

    return;
  }

  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  const filteredUsers = users.filter((user) => user.id !== +userId);

  if (filteredUsers.length === users.length) {
    res.sendStatus(404);

    return;
  }

  users = filteredUsers;

  res.sendStatus(204);
});

router.patch('/:userId', (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;

  const foundUser = users.find((user) => user.id === +userId);

  if (!foundUser) {
    res.status(404).send({
      error: 'User not found!',
    });

    return;
  }

  foundUser.name = name;

  res.json(foundUser);
});

module.exports = { router };
