'use strict';

const express = require('express');
const path = require('path');

let users = [];

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.send(users);
  })

  app.post('/users', (req, res) => {
    const user = {
      id: Math.max(0, ...users.map(u => u.id)) + 1,
      name: req.body.name
    }
    users.push(user)
    res.send(user);
  })

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users.find(u => u.id === Number(userId));
    res.send(user);
  })

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users.find(u => u.id === Number(userId));
    if (user) {
      users = users.filter(u => u.id !== Number(userId));

      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  })

  // Use express to create a server
  // Add a routes to the server
  return app;
}

module.exports = {
  createServer,
};

