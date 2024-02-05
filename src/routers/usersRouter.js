/* eslint-disable max-len */
'use strict';

const express = require('express');
const router = express.Router();

let users = [];
let id = 0;

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res) => {
  const foundUser = users.find(user => user.id === parseInt(req.params.id));

  res.send(foundUser || 'User not found');
});

router.post('/', (req, res) => {
  if (!req.body.name) {
    res.status(400);
    res.send();

    return;
  }

  const newUser = {
    id,
    name: req.body.name,
  };

  users.push(newUser);

  id++;

  res.status(201);
  res.send(newUser);
});

router.delete('/:id', (req, res) => {
  const foundUser = users.find(user => user.id === parseInt(req.params.id));

  if (!foundUser) {
    res.status(404);
    res.send();

    return;
  }

  users = users.filter(user => user !== foundUser);

  res.status(204);
  res.send();
});

router.patch('/:id', (req, res) => {
  const foundUser = users.findIndex(user => user.id === parseInt(req.params.id));

  if (foundUser < 0) {
    res.status(404);
    res.send();

    return;
  }

  if (!req.body.name) {
    res.status(400);
    res.send();

    return;
  }

  users[foundUser].name = req.body.name;

  res.status(200);
  res.send();
});

module.exports = router;
