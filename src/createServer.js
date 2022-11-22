'use strict';

const express = require('express');

// const { Expenses } = require('./services/expenses');
const { User } = require('./services/users');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const app = express();

  // const expenses = new Expenses();
  const user = new User();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.send(user.getUsers());
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = user.getUser(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(404);

      return;
    }

    res.statusCode(201);
    res.send(user.createUser(name));
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const userToRemove = user.getUser(userId);

    if (!userToRemove) {
      res.statusCode(404);

      return;
    }

    user.removeUser(userId);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const foundUser = user.getUser(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const updatedUser = user.updateUser(userId, name);

    res.statusCode(200);
    res.send(updatedUser);
  });

  app.get('/expenses', (req, res) => {

  });
  return app;
}

module.exports = {
  createServer,
};
