'use strict';

const express = require('express');
const userServices = require('./services/user.service');

function createServer() {
  userServices.init();

  const app = express();

  // const expenses = [];

  app.get('/users', (req, res) => {
    res.send(userServices.getAll());
  });

  app.get('/users/:userId', (req, res) => {
    const {
      userId,
    } = req.params;

    const user = userServices.getById(userId);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const {
      userId,
    } = req.params;
    const {
      name,
    } = req.body;
    const choosedUser = userServices.getById(userId);

    if (!choosedUser) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = userServices.update({
      userId,
      name,
    });

    res.send(updatedUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const {
      name,
    } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    userServices.create(name);

    res.status(201).send(userServices.create(name));
  });

  app.delete('/users/:userId', (req, res) => {
    const {
      userId,
    } = req.params;

    if (!userServices.getById(userId)) {
      res.sendStatus(404);

      return;
    }

    userServices.remove(userId);

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
