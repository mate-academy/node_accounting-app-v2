'use strict';

const express = require('express');
const router = express.Router();

let users = [];

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundUser = users.find(user => user.id == id);

  if (!foundUser) {
    res.sendStatus(404)
    return;
  }

  res.send(foundUser);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = users.find(user => user.id == id);

  if (!foundUser) {
    res.sendStatus(404)
    return;
  }

  users = users.filter(user => user.id != id);

  res.sendStatus(204);
});

router.post('/', express.json(), (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
    return;
  }

  const newUser = {
    id: users.length + 1,
    name,
  }

  users.push(newUser);

  res.statusCode = 201;
  res.send(newUser);
});

router.patch('/:id', express.json(), (req, res) => {
  const { name } = req.body;

  const { id } = req.params;

  const foundUser = users.find(user => user.id == id);

  if (!name) {
    res.sendStatus(400);
    return;
  }

  Object.assign(foundUser, { name });
  res.send(foundUser);
});


module.exports = {
  router,
  users,
};
