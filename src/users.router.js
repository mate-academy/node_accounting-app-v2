'use strict';

const express = require('express');

function createUsersRouter(data) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.status(200).send(data.users);
  });

  router.post('/', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Bad request');

      return;
    }

    const newUser = {
      id: data.countUsers,
      name,
    };

    data.countUsers++;
    data.users.push(newUser);

    res.status(201).send(newUser);
  });

  router.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).send('Bad request');

      return;
    }

    const user = data.users.find((usr) => usr.id === id);

    if (!user) {
      res.status(404).send('Not found');

      return;
    }

    res.send(user);
  });

  router.patch('/:id', express.json(), (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (Number.isNaN(id)) {
      res.status(400).send('Bad request');

      return;
    }

    const user = data.users.find((usr) => usr.id === id);

    if (!user) {
      res.status(404).send('Not found');

      return;
    }

    if (!name) {
      res.status(400).send('Bad request');

      return;
    }

    user.name = name;
    res.send(user);
  });

  router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).send('Bad request');

      return;
    }

    const user = data.users.find((usr) => usr.id === id);

    if (!user) {
      res.status(404).send('Not found');

      return;
    }

    data.users = data.users.filter((usr) => usr.id !== id);
    res.sendStatus(204);
  });

  return router;
}

module.exports = {
  createUsersRouter,
};
