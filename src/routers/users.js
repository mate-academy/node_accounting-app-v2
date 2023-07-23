'use strict';

const express = require('express');
const router = express.Router();

let users = [];

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const foundUser = users.find(user => user.id === +userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: Math.floor(Math.random() * 100) + 1,
    name,
  };

  users.push(newUser);

  res.statusCode = 201;
  res.send(newUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  const filteredUsers = users.filter(user => user.id !== +userId);

  if (filteredUsers.length === users.length) {
    res.sendStatus(404);

    return;
  }

  users = filteredUsers;

  res.sendStatus(204);
});

router.patch('/:userId', (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = users.find(user => user.id === +userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  Object.assign(foundUser, { name });

  res.send(foundUser);
});

module.exports = {
  router,
  users,
};
