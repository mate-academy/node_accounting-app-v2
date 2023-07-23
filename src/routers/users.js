'use strict';

const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let users = [{
  'id': '1',
  'name': 'Max',
}];

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  const foundUser = users.find(user => user.id === userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
});

router.post('/users', express.json(), (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const newUser = {
    id: uuidv4(),
    name,
  };

  users.push(newUser);

  res.statusCode = 201;
  res.send(newUser);
});

router.delete('/users/:userId', (req, res) => {
  const { userId } = req.params;

  const filteredUsers = users.filter(user => user.id !== userId);

  if (filteredUsers.length === users.length) {
    res.sendStatus(422);

    return;
  }

  users = filteredUsers;

  res.sendStatus(204);
});

router.patch('/users/:userId', (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = users.find(user => user.id === userId);

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
