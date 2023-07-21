'use strict';

const express = require('express');
const router = express.Router();

let users = [];

router.get('/', (req, res) => {
  res.send(users);
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const newUserId = users.length + 1;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: newUserId,
    name,
  };

  users.push(newUser);
  res.sendStatus(201);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const foundUser = users.find(user => user.id === +userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(foundUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  const newUsers = users.filter(user => user.id !== +userId);

  if (newUsers.length === users.length) {
    res.sendStatus(404);

    return;
  }

  users = newUsers;

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

module.exports = { router };
