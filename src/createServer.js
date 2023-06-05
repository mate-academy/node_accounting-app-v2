'use strict';

const express = require('express');
const userService = require('./services/users.js');
const expensService = require('./services/expenses.js');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    const users = userService.getAll();

    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = userService.create(name);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = userService.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = userService.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    userService.remove(userId);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = userService.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);
    }

    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    }

    userService.update(userId, name);
    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    const expenses = expensService.getAll();

    res.send(expenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      res.sendStatus(400);

      return;
    }

    const newExpens = expensService.create(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.statusCode = 201;
    res.send(newExpens);
  });

  app.get('/expenses/:expensId', (req, res) => {
    const { expensId } = req.params;
    const foundExpens = expensService.getExpensById(expensId);

    if (!foundExpens) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpens);
  });

  app.delete('/expenses/:expensId', (req, res) => {
    const { expensId } = req.params;
    const foundExpens = expensService.getExpensById(expensId);

    if (!foundExpens) {
      res.sendStatus(404);

      return;
    }

    expensService.remove(expensId);
    res.sendStatus(204);
  });

  app.patch('/expenses/:expensId', express.json(), (req, res) => {
    const { expensId } = req.params;
    const foundExpens = expensService.getExpensById(expensId);

    if (!foundExpens) {
      res.sendStatus(404);
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (!spentAt && !title && !amount && !category && !note) {
      res.sendStatus(400);
    }

    expensService.update(
      expensId,
      spentAt,
      title,
      amount,
      category,
      note,
    );
    res.send(foundExpens);
  });

  return app;
}

module.exports = {
  createServer,
};

// Use express to create a server
// Add a routes to the server
// Return the server (express app)

// MVC (model view controller)
