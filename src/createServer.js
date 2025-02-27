'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.join());

  const users = [];
  const expences = [];
  const userId = 1;
  const expenceId = 1;

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const user = {
      id: userId++,
      name,
    };

    users.push(user);
    res.status(201).json(user);
  });

  app.post('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      res.status(404).send('User not found');
    }

    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).send('User not found');
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    user.name = name;
    res.json(user);
  });

  app.delete('users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (user === -1) {
      return res.status(404).send('User not found');
    }

    users.splice(user, 1);
    res.status(204).send();
  });

  app.get('/expenses', (req, res) => {
    res.json(expenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.status(400).send('Missing required fields');
    }

    const userExists = users.some((u) => u.id === userId);

    if (!userExists) {
      return res.status(400).send('User not found');
    }

    const expense = {
      id: expenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);
    res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.json(expense);
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

  return app;
}

module.exports = {
  createServer,
};
