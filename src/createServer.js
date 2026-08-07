'use strict';

const express = require('express');
// const Router = require('express');
const cors = require('cors');
const usersService = require('./usersService');

function createServer() {
  const users = [];
  const expenses = [];

  const app = express();

  app.use(express.json());

  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', (req, res) => {
    const user = req.body.name;

    usersService.addOneUser(user, users);

    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    console.log(typeof userId);

    const someUser = usersService.getUserById(userId, users);

    console.log(someUser, 'user');

    if (someUser === undefined) {
      console.log('user is udefined');

      res.sendStatus(404);

      return;
    }

    res.send(someUser);
  });

  app.get('/expenses', (req, res) => {
    res.send(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = req.params.id;

    const someUser = usersService.getAll(id, expenses);

    res.send(someUser);
  });

  return app;
}

module.exports = {
  createServer,
};
