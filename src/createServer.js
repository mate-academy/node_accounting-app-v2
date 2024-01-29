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

  app.patch('/users/:id', express.json(), (req, res) => {
    const { name } = req.body;
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

    const oldUser = users[index];

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      id: oldUser.id,
      name: name || oldUser.name,
    };

    users[index] = user;
    res.statusCode = 200;
    res.send(user);
  });

  app.get('/expenses', (req, res) => {
    const searchParams = new URLSearchParams(req.url
      .substring('/expenses'.length));
    const userId = searchParams.get('userId');
    const categories = searchParams.getAll('categories');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const outExpenses = expenses.filter(e =>
      (userId === null || e.userId === Number(userId))
      && (categories.length === 0 || categories.includes(e.category))
      && (from === null || new Date(e.spentAt) >= new Date(from))
      && (to === null || new Date(e.spentAt) <= new Date(to))
    );

    res.send(outExpenses);
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

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
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

    const oldExpense = expenses[index];

    if (userId === undefined && !spentAt
      && !title && amount === undefined && !category) {
      res.sendStatus(400);

      return;
    }

    if (!users.map(u => u.id).includes(userId) && userId !== undefined) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      id: oldExpense.id,
      userId: userId || oldExpense.userId,
      spentAt: spentAt || oldExpense.spentAt,
      title: title || oldExpense.title,
      amount: amount || oldExpense.amount,
      category: category || oldExpense.category,
      note: note || oldExpense.note,
    };

    expenses[index] = expense;
    res.statusCode = 200;
    res.send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
