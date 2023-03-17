'use strict';

const express = require('express');

function getRandomDigits() {
  return +Math.random().toString().slice(2);
}

function createServer() {
  let users = [];
  const app = express();

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
      id: getRandomDigits(),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.status(404).send('User does not exist');

      return;
    }

    res.send(foundUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const filteredUsers = users.filter(user => user.id !== +id);

    if (filteredUsers.length === users.length) {
      res.status(404).send('User does not exist');

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

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  return app;
}

module.exports = {
  createServer,
};
