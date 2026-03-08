'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.get('/users', (_req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = { id: nextUserId++, name };

    users.push(user);
    res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    Object.assign(user, req.body);
    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex((u) => u.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(index, 1);
    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    let result = expenses;

    if (userId) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    if (from) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    if (categories) {
      const cats = Array.isArray(categories) ? categories : [categories];

      result = result.filter((e) => cats.includes(e.category));
    }

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || amount === undefined || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = users.find((u) => u.id === Number(userId));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const expense = {
      id: nextExpenseId++,
      userId: Number(userId),
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
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    if (req.body.userId !== undefined) {
      const user = users.find((u) => u.id === Number(req.body.userId));

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    }

    Object.assign(expense, req.body);
    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const index = expenses.findIndex((e) => e.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expenses.splice(index, 1);
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
