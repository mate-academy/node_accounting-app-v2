'use strict';

const express = require('express');
const router = express.Router();

let users = [];

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const foundUser = users.find(user => user.id === +userId);

  if (!foundUser) {
    res.status(404);
    res.send('User not found');

    return;
  }

  res.json(foundUser);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.send('User is not added');

    return;
  }

  const newUser = {
    id: Math.floor(Math.random() * 100) + 1,
    name,
  };

  users.push(newUser);

  res.statusCode = 201;
  res.json(newUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  const filteredUsers = users.filter(user => user.id !== +userId);

  if (filteredUsers.length === users.length) {
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

  const foundUser = users.find(user => user.id === +userId);

  if (!foundUser) {
    res.status(404);
    res.send('User for updating not found');

    return;
  }

  Object.assign(foundUser, { name });

  res.json(foundUser);
});

module.exports = {
  router,
  users,
};
