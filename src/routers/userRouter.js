'use strict';

const express = require('express');

const router = express.Router();

const userServise = require('../services/users.js');

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: Math.floor(Math.random() * 10),
    name,
  };

  userServise.add(newUser);

  res.statusCode = 201;
  res.send(newUser);
});

router.get('/', (req, res) => {
  const users = userServise.getAll();

  res.statusCode = 200;

  if (!users) {
    res.send([]);

    return;
  }

  res.send(users);
});

router.get('/:id', (req, res) => {
  const userId = Number(req.params.id);

  if (typeof userId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundUser = userServise.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(foundUser);
});

router.patch('/:id', (req, res) => {
  const userId = Number(req.params.id);

  if (typeof userId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundUser = userServise.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServise.update(foundUser, { ...req.body });

  res.statusCode = 200;

  res.send(foundUser);
});

router.delete('/:id', (req, res) => {
  const userId = Number(req.params.id);

  const foundUser = userServise.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServise.remove(foundUser.id);
  res.sendStatus(204);
});

module.exports = router;
