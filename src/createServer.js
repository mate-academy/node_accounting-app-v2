'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  let users = [];
  const expences = [];

  let nextUserId = 1;
  let nextExpenceId = 1;

  const app = express();

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      id: nextUserId++,
      name,
    };

    users.push(user);

    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users', express.json(), (req, res) => {
    res.statusCode = 200;
    res.send(Object.values(users));
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const filteredUsers = users.filter(user => user.id !== +id);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  return app;
}

module.exports = {
  createServer,
};
