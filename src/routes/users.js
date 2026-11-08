'use strict';

const express = require('express');
const { findById, findIndexById } = require('../helpers');

function createUsersRouter(db) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send(db.users);
  });

  router.get('/:id', (req, res) => {
    const user = findById(db.users, req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(user);
  });

  router.post('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = { id: db.nextUserId++, name };

    db.users.push(user);
    res.status(201).send(user);
  });

  router.patch('/:id', (req, res) => {
    const user = findById(db.users, req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    const { name } = req.body;

    if (name !== undefined) {
      user.name = name;
    }

    res.send(user);
  });

  router.delete('/:id', (req, res) => {
    const index = findIndexById(db.users, req.params.id);

    if (index === -1) {
      return res.sendStatus(404);
    }

    db.users.splice(index, 1);
    res.sendStatus(204);
  });

  return router;
}

module.exports = { createUsersRouter };
