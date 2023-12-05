'use strict';

const express = require('express');

const { notFoundResponse } = require('./helpers/notFoundResponse');

function createServer() {
  let users = [];
  let nextId = 0;
  // const expenses = [];

  const app = express();

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res
        .status(400)
        .json({
          error: 'Please provide a valid `name` as a string.',
        });
    }

    const newUser = {
      id: nextId++,
      name,
    };

    users.push(newUser);

    res.status(201);
    res.send(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find(u => u.id === +id);

    if (!user) {
      notFoundResponse(res);
    }

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUsers = users.filter(user => user.id !== +id);

    if (users.length === newUsers.length) {
      notFoundResponse(res);
    }

    users = newUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find(u => u.id === +id);

    if (!name || typeof name !== 'string') {
      return res
        .status(400)
        .json({
          error: 'Please provide a valid `name` as a string.',
        });
    }

    if (!user) {
      notFoundResponse(res);
    }

    Object.assign(user, { name });

    res.send(user);
  });

  return app;
}

module.exports = {
  createServer,
};
