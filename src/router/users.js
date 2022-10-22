/* eslint-disable no-shadow */
'use strict';

const express = require('express');

const {
  init,
  getAll,
  getUserById,
  createUser,
  removeUser,
  updateUser,
} = require('../services/users');

const router = express.Router();

function createUsers(app) {
  app.use('/users', router);
  init();

  router.get('/', (req, res) => {
    const users = getAll();

    res.send(users);
    res.statusCode = 200;
  });

  router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  router.post('/', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = createUser(name);

    res.statusCode = 201;
    res.send(newUser);
  });

  router.delete('/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    removeUser(userId);
    res.sendStatus(204);
  });

  router.patch('/:userId', express.json(), (req, res) => {
    const { userId } = req.params;

    const foundUser = getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    updateUser({
      id: userId,
      name,
    });

    res.send(foundUser);
    res.statusCode = 200;
  });
}

module.exports = { createUsers };
