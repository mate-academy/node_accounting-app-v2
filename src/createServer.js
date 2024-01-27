'use strict';

const express = require('express');
const app = express();
let users = [];
let expenses = [];

const createUserId = () => {
  return users.length + 1;
};

const createExpensesId = () => {
  return expenses.length + 1;
};

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  users = [];
  expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      id: createUserId(),
      name,
    };

    users.push(user);
    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
      res.sendStatus(400);

      return;
    }

    const user = users.find(u => u.id === Number(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
      res.sendStatus(400);

      return;
    }

    const index = users.findIndex(u => u.id === Number(id));

    if (index === -1) {
      res.sendStatus(404);

      return;
    }
    users.splice(index, 1);
    res.sendStatus(204);
  });

  app.patch('/users:id', (req, res) => {
  });

  app.get('/expenses', (req, res) => {
    res.send(expenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId === undefined || !spentAt
      || !title || amount === undefined || !category) {
      res.sendStatus(400);

      return;
    }

    if (!(users.map(u => u.id).includes(userId))) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      id: createExpensesId(),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);
    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
      res.sendStatus(400);

      return;
    }

    const expense = expenses.find(e => e.id === Number(id));

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
      res.sendStatus(400);

      return;
    }

    const index = expenses.findIndex(e => e.id === Number(id));

    if (index === -1) {
      res.sendStatus(404);

      return;
    }
    expenses.splice(index, 1);
    res.sendStatus(204);
  });

  app.patch('/expenses:id', (req, res) => {
  });

  return app;
}

module.exports = {
  createServer,
};
