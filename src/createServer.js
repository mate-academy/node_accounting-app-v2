'use strict';

const express = require('express');

let users = [];

let expenses = [];

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const id = users.length
      ? Number(Math.max(...users.map((user) => user.id)) + 1)
      : 1;

    const newUser = {
      id,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.delete('users/:userId', (req, res) => {
    const { userId } = req.params;

    const filteredUsers = users.filter(user => user.id !== Number(userId));

    // eslint-disable-next-line no-console
    console.log(userId, filteredUsers);

    // if (filteredUsers.length === users.length) {
    //   res.sendStatus(404);

    //   return;
    // }

    users = filteredUsers;

    res.sendStatus(204);
  });

  app.patch('users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);
    }

    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    }

    Object.assign(foundUser, { name });
    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    res.send(expenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      res.sendStatus(400);

      return;
    }

    const newExpens = {
      id: Number(Math.max(users.map(({ id }) => id)) + 1),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    users.push(newExpens);

    res.statusCode = 201;
    res.send(newExpens);
  });

  app.get('/expenses/:expensId', (req, res) => {
    const { expensId } = req.params;
    const foundExpens = expenses.find(expens => expens.id === Number(expensId));

    if (!foundExpens) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpens);
  });

  app.delete('/expenses/:expensId', (req, res) => {
    const { expensId } = req.params;

    const filteredExpenses = expenses.filter(expens => expens.id !== expensId);

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:expensId', express.json(), (req, res) => {
    const { expensId } = req.params;
    const foundExpens = expenses.find(expens => expens.id === expensId);

    if (!foundExpens) {
      res.sendStatus(404);
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (!spentAt && !title && !amount && !category && !note) {
      res.sendStatus(400);
    }

    Object.assign(foundExpens, {
      spentAt, title, amount, category, note,
    });
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
