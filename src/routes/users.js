'use strict';

const express = require('express');

function createUsersRouter(users) {
  const router = express.Router();
  let userIdCounter = 1;

  router.get('/', (req, res) => {
    res.send(users);
  });

  router.post('/', (req, res) => {
    const user = req.body;

    if (!user.name) {
      return res.status(400).send('Name is required');
    }

    user.id = userIdCounter;
    userIdCounter++;

    users.push(user);
    res.status(201).send(user);
  });

  router.get('/:id', (req, res) => {
    const user = users.find((us) => us.id === Number(req.params.id));

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  });

  router.delete('/:id', (req, res) => {
    const index = users.findIndex((us) => us.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).send('User not found');
    }

    users.splice(index, 1);

    res.status(204).send('Deleted');
  });

  router.patch('/:id', (req, res) => {
    const index = users.findIndex((us) => us.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).send('User not found');
    }

    users[index] = {
      ...users[index],
      ...req.body,
    };

    res.send(users[index]);
  });

  return router;
}

module.exports = createUsersRouter;
