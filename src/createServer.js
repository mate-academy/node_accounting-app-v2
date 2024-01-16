'use strict';

const { getNewId } = require('./helpers/getNewId');
// const User = require('./types/User');

const express = require('express');

let users = [{
  'id': 1, 'name': 'Anton',
}, {
  'id': 2, 'name': 'Anton',
}, {
  'id': 3, 'name': 'Ivan',
}, {
  'id': 4, 'name': 'Viktor',
}, {
  'id': 5, 'name': 'Anna',
}];

const expenses = [];

const getUserById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const server = express();

server.get('/users', (req, res) => {
  res.send(users);
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;

  const expectedUser = getUserById(id);

  if (!expectedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(expectedUser);
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const normalizedId = +id;

  if (!normalizedId || normalizedId.isNaN) {
    res.sendStatus(400);

    return;
  }

  if (!getUserById(normalizedId)) {
    res.sendStatus(404);

    return;
  }

  const newUsers = users.filter(user => user.id !== normalizedId);

  users = [...newUsers];

  res.sendStatus(204);
});

server.post('/users', express.json(), (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);
  res.send(newUser);
});

server.patch('/users/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const normalizedId = +id;

  if (!normalizedId || normalizedId.isNaN) {
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string' || !name.length) {
    res.sendStatus(400);

    return;
  }

  if (!getUserById(normalizedId)) {
    res.sendStatus(404);

    return;
  }

  const userToUpdate = getUserById(normalizedId);

  Object.assign(userToUpdate, { name });

  res.send(userToUpdate);
});

function createServer() {
  server.use('/', (req, res) => {
    res.send('Hello Express!');
  });

  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  return server;
}

module.exports = {
  createServer,
};
