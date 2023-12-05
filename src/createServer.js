'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(users);
  });

  app.post('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.body.name) {
      const user = {
        id: Math.max(0, ...users.map(u => u.id)) + 1,
        name: req.body.name,
      };

      users.push(user);

      return res.status(201).send(user);
    } else {
      res.sendStatus(400);
    }
  });

  app.get('/users/:userId', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { userId } = req.params;
    const user = users.find(u => u.id === Number(userId));

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users.find(u => u.id === Number(userId));

    if (user) {
      users = users.filter(u => u.id !== Number(userId));

      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

  app.patch('/users/:userId', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { userId } = req.params;
    const user = users.find(u => u.id === Number(userId));

    if (user) {
      user.name = req.body.name;
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  });

  // Expenses

  let expenses = [];

  app.get('/expenses', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { userId, from, to, categories } = req.query;
    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = filteredExpenses
        .filter(e => e.userId === Number(userId));
    }

    if (from && to) {
      filteredExpenses = filteredExpenses
        .filter(e => e.spentAt > from && e.spentAt < to);
    }

    if (categories) {
      filteredExpenses = filteredExpenses
        .filter(e => categories.includes(e.category));
    }
    res.send(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const userId = req.body.userId;

    if (userId && users.find(u => u.id === Number(userId))) {
      const expense = {
        id: expenses.length,
        ...req.body,
      };

      expenses.push(expense);

      res.status(201).send(expense);
    } else {
      res.sendStatus(400);
    }
  });

  app.get('/expenses/:expenseId', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { expenseId } = req.params;
    const expense = expenses.find(e => e.id === Number(expenseId));

    if (expense) {
      res.send(expense);
    } else {
      res.sendStatus(404);
    }
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { expenseId } = req.params;
    const expense = expenses.find(e => e.id === Number(expenseId));

    if (expense) {
      expense.title = req.body.title;
      res.send(expense);
    } else {
      res.sendStatus(404);
    }
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const expense = expenses.find(e => e.id === Number(expenseId));

    if (expense) {
      expenses = expenses.filter(e => e.id !== Number(expenseId));

      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

  return app;
}

module.exports = {
  createServer,
};
