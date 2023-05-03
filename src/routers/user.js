'use strict';

const express = require('express');
const userService = require('../services/user');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  const users = userService.getUsers();

  res.json(users);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.json(foundUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.removeUserById(userId);

  res.sendStatus(204);
});

router.patch('/:userId', (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const updated = userService.patchUser(foundUser, { name });

  res.json(updated);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const createdUser = userService.addUser({ name });

  res.status(201);
  res.json(createdUser);
});

module.exports = router;
