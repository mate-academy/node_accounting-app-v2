'use strict';

// const { v4 } = require('uuid');
const express = require('express');

function createServer() {
  const app = express();
  let users = [

  ];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const wantedUser = users.find(user => user.id === Number(userId));

    if (!wantedUser) {
      res.sendStatus(404);

      // eslint-disable-next-line no-useless-return
      return;
    }

    res.send(wantedUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: users.length + 1,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const wantedUser = users.find(user => user.id === Number(userId));

    if (!wantedUser) {
      res.sendStatus(404);

      // eslint-disable-next-line no-useless-return
      return;
    }

    if (!name) {
      res.sendStatus(400);

      // eslint-disable-next-line no-useless-return
      return;
    }

    Object.assign(wantedUser, { name });

    res.send(wantedUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id !== Number(userId));

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
