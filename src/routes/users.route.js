'use strict';

const express = require('express');
const users = require('../services/users.service');

const router = express.Router();

router.param('id', (req, res, next, id) => {
  const num = parseInt(id);

  if (isNaN(num)) {
    res.status(400).send({ error: 'Invalid ID format' });
  } else {
    req.params.id = num;
    next();
  }
});

router.get('/', (_, res) => {
  const usersFromServer = users.getUsers();

  if (!usersFromServer.length) {
    res.sendStatus(404);

    return;
  }

  res.send(usersFromServer);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
});

router.post('/', express.json(), (req, res) => {
  const { name = 'Mykola' } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  users.createUser(name);

  res.sendStatus(201);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  users.removeUser(id);

  res.sendStatus(204);
});

router.patch('/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = users.getUserById(id);

  if (!name) {
    res.sendStatus(422);

    return;
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const newData = users.updateUser(user, name);

  res.send(newData);
});

module.exports = {
  router,
};
