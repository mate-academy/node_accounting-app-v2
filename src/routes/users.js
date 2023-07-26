'use strict';

const express = require('express');
const router = express.Router();

let users = [];

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.send('User is not added');

    return;
  }

  const newUser = {
    id: Math.floor(Math.random() * 100),
    name,
  };

  users.push(newUser);

  res.statusCode = 201;
  res.json(newUser);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  const findUser = users.find(user => user.id === Number(userId));

  if (!findUser) {
    res.status(404);
    res.send('User not found');

    return;
  }

  res.json(findUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  const filteredUsers = users.filter(user => user.id !== Number(userId));

  if (users.length === filteredUsers.length) {
    res.status(404);
    res.send('User for deleting not found');

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
    res.status(404);
    res.send('User for updating not found');

    return;
  }

  if (!name) {
    res.sendStatus(422);

    return;
  }

  Object.assign(findUser, { name });

  res.json(findUser);
});

module.exports = {
  router,
  users,
};
