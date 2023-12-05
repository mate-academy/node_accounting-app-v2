'use strict';

const express = require('express');
const path = require('path');

const users = [];

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

  // Use express to create a server
  // Add a routes to the server
  return app;
}

module.exports = {
  createServer,
};

