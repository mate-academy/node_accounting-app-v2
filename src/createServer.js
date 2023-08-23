'use strict';

const express = require('express');
const uuidv4 = require('uuid').v4;

const app = express();

let users = [];

function createServer() {
  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: uuidv4,
      name,
    };

    users.push(newUser);

    res.sendStatus(201);
    res.send(newUser);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id !== userId);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, resp) => {
    const { userId } = req.params;
    const receivedData = req.body;

    const currentUser = users.find(user => user.id === userId);

    if (!currentUser) {
      resp.sendStatus(404);

      return;
    }

    Object.assign(currentUser, receivedData);

    resp.send(currentUser);
  });

  return app;
}

module.exports = {
  createServer,
};
