'use strict';

const express = require('express');
// const cors = require('cors');

function createServer() {
  const app = express();

  let users = [
    // {
    //   id: 1,
    //   name: 'string',
    // },
  ];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    if (isNaN(+userId)) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(({ id }) => +userId === id);

    foundUser ? res.send(foundUser) : res.sendStatus(404);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const newId = Math.max(0, ...users.map(({ id }) => id)) + 1;
    const newUser = {
      id: newId,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(({ id }) => +userId !== id);
    const isUserFound = users.length !== filteredUsers.length;

    users = filteredUsers;

    res.sendStatus(isUserFound ? 204 : 404);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    if (isNaN(+userId) || !name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(({ id }) => +userId === id);

    if (!foundUser) {
      res.sendStatus(404);

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
