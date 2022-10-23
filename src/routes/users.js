'use strict';

const express = require('express');

const router = express.Router();

const userServise = require('../services/users');

router.get('/', (req, res) => {
  const users = userServise.getAllUsers();

  if (!users) {
    res.statusCode = 200;

    res.send([]);

    return;
  }

  res.statusCode = 200;

  res.send(users);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;

    res.send();

    return;
  }

  const user = {
    name,
    id: userServise.getAllUsers().length + 1,
  };

  userServise.add(user);

  res.statusCode = 201;

  res.send(user);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = userServise.getUserById(id);

  if (!foundUser) {
    res.statusCode = 404;

    res.send();

    return;
  }

  const userId = Number(id);

  if (Number.isNaN(userId)) {
    res.statusCode = 400;

    res.send();

    return;
  }

  res.statusCode = 200;

  res.send(foundUser);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = userServise.getUserById(id);

  if (!foundUser) {
    res.statusCode = 404;

    res.send();

    return;
  }

  userServise.removeUserById(id);

  res.statusCode = 204;

  res.send();
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = userServise.getUserById(id);

  if (!foundUser) {
    res.statusCode = 404;

    res.send();

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;

    res.send();

    return;
  }

  foundUser.name = name;

  res.statusCode = 200;

  res.send(foundUser);
});

module.exports = router;
