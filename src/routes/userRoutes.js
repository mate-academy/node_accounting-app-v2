/* eslint-disable no-param-reassign */

'use strict';

const express = require('express');
const userService = require('../services/userService');

const userRoutes = (users, userId) => {
  const router = express.Router();

  router.post('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send();
    }

    const newUser = userService.createUser(users, userId, name);

    userId = newUser.id;

    res.status(201).json(newUser);
  });

  router.get('/', (req, res) => {
    res.status(200).json(users);
  });

  router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).send();
    }
    res.status(200).json(user);
  });

  router.patch('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).send({ message: 'Not found' });
    }

    const { name } = req.body;

    if (name) {
      user.name = name;
    }
    res.status(200).json(user);
  });

  router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).send();
    }
    users.splice(index, 1);
    res.status(204).send();
  });

  return router;
};

module.exports = userRoutes;
