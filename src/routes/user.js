'use strict';

const express = require('express');
const router = express.Router();

let users = [];

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const findUser = users.find(user => user.id === +userId);

  if (!findUser) {
    res.status(404);
    res.send('Can\'t find the user');

    return;
  }

  res.send(findUser);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.send('Params are not valid');

    return;
  }

  const newUser = {
    id: Math.floor(Math.random() * 100),
    name,
  };

  users.push(newUser);

  res.status(201);
  res.send(newUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  const filteredUsers = users.filter(user => user.id !== +userId);

  if (filteredUsers.length === users.length) {
    res.status(404);
    res.send('Can\'t find the user');

    return;
  }

  users = filteredUsers;
  res.sendStatus(204);
});

router.patch('/:userId', (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;

  if (!name) {
    res.status(400);
    res.send('Params are not valid');
  }

  const foundUser = users.find(user => user.id === +userId);

  if (!foundUser) {
    res.status(404);
    res.send('Cna\'t find the user');
  }

  foundUser.name = req.body.name;
  res.send(foundUser);
});

module.exports = {
  router,
  users,
};
