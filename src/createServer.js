'use strict';

const express = require('express');

let users = [];
let expenses = [];
let nextUserId = 1;
let nextExpenseId = 1;

function createServer() {
  users = [];
  expenses = [];
  nextUserId = 1;
  nextExpenseId = 1;

  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const user = { id: nextUserId++, name };

    users.push(user);
    res.status(201).json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).send('User not found');
    }
    user.name = req.body.name ?? user.name;
    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex((u) => u.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).send('User not found');
    }
    users.splice(index, 1);
    res.status(204).send();
  });

  app.get('/expenses', (req, res) => {
    res.json(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }
    res.json(expense);
  });

  app.post('/expenses', (req, res) => {
    const { userId, title, amount, category, spentAt, note } = req.body;
    const userExists = users.some((u) => u.id === userId);

    if (!userExists) {
      return res.status(400).send('User not found');
    }

    const expense = {
      id: nextExpenseId++,
      userId,
      title,
      amount,
      category,
      spentAt,
      note,
    };

    expenses.push(expense);
    res.status(201).json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    Object.assign(expense, req.body);
    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const index = expenses.findIndex((e) => e.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).send('Expense not found');
    }
    expenses.splice(index, 1);
    res.status(204).send();
  });

  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).send('Internal Server Error');
  });

  return app;
}

module.exports = {
  createServer,
};
