'use strict';

const express = require('express');
const router = express.Router();

let users = [];

router.get('/', (req, res) => {
  res.send(users);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: Math.floor(Math.random() * 100),
    name,
  };

  users.push(newUser);

  res.statusCode = 201;
  res.send(newUser);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  const findUser = users.find(user => user.id === Number(userId));

  if (!findUser) {
    res.sendStatus(404);

    return;
  }

  res.send(findUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  const filteredUsers = users.filter(user => user.id !== Number(userId));

  if (users.length === filteredUsers.length) {
    res.sendStatus(404);

    return;
  }

  users = filteredUsers;

  res.sendStatus(204);
});

router.patch('/:userId', (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const findUser = users.find(user => user.id === Number(userId));

  if (!findUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(422);

    return;
  }

  Object.assign(findUser, { name });

  res.send(findUser);
});

module.exports = {
  router,
  users,
};
