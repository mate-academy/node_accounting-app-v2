'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  // Users
  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('name is required');
    }

    const user = { id: nextUserId++, name };

    users.push(user);

    return res.status(201).json(user);
  });

  app.get('/users', (req, res) => res.json(users));

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send('user not found');
    }

    return res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send('user not found');
    }

    const { name } = req.body;

    if (name !== undefined) {
      user.name = name;
    }

    return res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = users.findIndex((u) => u.id === id);

    if (idx === -1) {
      return res.status(404).send('user not found');
    }
    users.splice(idx, 1);

    return res.status(204).send();
  });

  // Expenses
  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      spentAt === undefined ||
      title === undefined ||
      amount === undefined ||
      category === undefined ||
      note === undefined
    ) {
      return res.status(400).send('missing fields');
    }

    const user = users.find((u) => u.id === Number(userId));

    if (!user) {
      return res.status(400).send('user not found');
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

    return res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    let result = expenses.slice();

    const { userId, from, to, categories } = req.query;

    if (userId !== undefined) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    if (from !== undefined || to !== undefined) {
      const fromTs = from ? Date.parse(from) : -Infinity;
      const toTs = to ? Date.parse(to) : Infinity;

      result = result.filter((e) => {
        const t = Date.parse(e.spentAt);

        return t >= fromTs && t <= toTs;
      });
    }

    if (categories !== undefined) {
      const cats = String(categories).split(',');

      result = result.filter((e) => cats.includes(e.category));
    }

    return res.json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const exp = expenses.find((e) => e.id === id);

    if (!exp) {
      return res.status(404).send('expense not found');
    }

    return res.json(exp);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const exp = expenses.find((e) => e.id === id);

    if (!exp) {
      return res.status(404).send('expense not found');
    }

    const allowed = [
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) {
        exp[field] =
          field === 'userId' ? Number(req.body[field]) : req.body[field];
      }
    });

    return res.json(exp);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = expenses.findIndex((e) => e.id === id);

    if (idx === -1) {
      return res.status(404).send('expense not found');
    }
    expenses.splice(idx, 1);

    return res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
