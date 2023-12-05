'use strict';

const express = require('express');

let users = [];

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(users);
  });

  app.post('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.body.name) {
      const user = {
        id: Math.max(0, ...users.map(u => u.id)) + 1,
        name: req.body.name,
      };

      users.push(user);

      res.status(201);
      res.send(user);
    } else {
      res.sendStatus(400);
    }
  });

  app.get('/users/:userId', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { userId } = req.params;
    const user = users.find(u => u.id === Number(userId));

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users.find(u => u.id === Number(userId));

    if (user) {
      users = users.filter(u => u.id !== Number(userId));

      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

  app.patch('/users/:userId', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { userId } = req.params;
    const user = users.find(u => u.id === Number(userId));

    if (user) {
      user.name = req.body.name;
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  // Use express to create a server
  // Add a routes to the server
  return app;
}

module.exports = {
  createServer,
};
