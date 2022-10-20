'use strict';

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
let users = [];

uuidv4();

router.post('/users', express.json(), (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const createdUser = {
    id: Math.floor(Math.random() * 100),
    name,
  };

  users.push(createdUser);
  res.statusCode = 201;
  res.send(createdUser);
});

router.get('/users', express.json(), (req, res) => {
  if (users.length === 0) {
    res.statusCode = 200;
    res.send([]);

    return;
  }

  res.statusCode = 200;
  res.send(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  res.send(foundUser);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const userId = Number(id);

  const foundUser = users.find(user => user.id === userId);

  if (!foundUser) {
    res.sendStatus(204);

    return;
  }

  users = users.filter(user => user.id !== id);
  res.sendStatus(204);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = users.find(user => user.id === id);

  if (!foundUser) {
    res.sendStatus(404);
  }

  const { name } = req.body;

  foundUser.name = name;
  res.statusCode = 200;
  res.send(foundUser);
});

module.exports = router;
