'use strict';

const express = require('express');
const router = express.Router();
// const { v4: uuidv4 } = require('uuid');

let users = [];

const resetUsers = () => {
  users = [];
};

function getUsers() {
  return users;
}

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(400);
    res.send('name in required');

    return;
  }

  const newUser = {
    // id: uuidv4(),
    id: Math.floor(Math.random() * 100 + 1),
    name,
  };

  users.push(newUser);

  res.status(201);
  res.send(newUser);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const requestedUser = users.find(user => user.id === +userId);

  if (!requestedUser) {
    res.status(404);
    res.send('User is not exist');

    return;
  }

  res.json(requestedUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  const filteredUsers = users.filter(user => user.id !== +userId);

  if (filteredUsers.length === users.length) {
    res.status(404);
    res.send('User is not exist');

    return;
  }

  users = filteredUsers;

  res.sendStatus(204);
});

router.patch('/:userId', (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const requestedUser = users.find(user => user.id === +userId);

  if (!requestedUser) {
    res.status(404);
    res.send('User is not exist');

    return;
  }

  if (typeof name !== 'string') {
    res.status(404);
    res.send('Name in required');

    return;
  }

  Object.assign(requestedUser, { name });

  res.json(requestedUser);
});

module.exports = {
  router,
  resetUsers,
  getUsers,
};
