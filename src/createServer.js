'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  const parseId = (val) => {
    const id = Number(val);

    return Number.isFinite(id) ? id : NaN;
  };

  const findById = (list, id) => list.find((x) => x.id === id);

  const hasFields = (obj, fields) =>
    obj && typeof obj === 'object' && fields.every((k) => obj[k] !== undefined);

  app.post('/users', (req, res) => {
    const { name } = req.body || {};

    if (!name) {
      return res.status(400).end();
    }

    const user = { id: nextUserId++, name };

    users.push(user);

    res.status(201).json(user);
  });

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = parseId(req.params.id);
    const user = findById(users, id);

    if (!user) {
      return res.status(404).end();
    }

    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = parseId(req.params.id);
    const user = findById(users, id);

    if (!user) {
      return res.status(404).end();
    }

    if (req.body?.name !== undefined) {
      user.name = req.body.name;
    }

    res.json(user);
  });

  app.put('/users/:id', (req, res) => {
    const id = parseId(req.params.id);
    const user = findById(users, id);

    if (!user) {
      return res.status(404).end();
    }

    if (req.body?.name !== undefined) {
      user.name = req.body.name;
    }

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = parseId(req.params.id);
    const idx = users.findIndex((u) => u.id === id);

    if (idx === -1) {
      return res.status(404).end();
    }

    users.splice(idx, 1);
    res.status(204).end();
  });

  const EXPENSE_FIELDS = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
    'note',
  ];

  app.post('/expenses', (req, res) => {
    const data = req.body;

    if (!hasFields(data, EXPENSE_FIELDS)) {
      return res.status(400).end();
    }

    const userId = parseId(data.userId);

    if (!findById(users, userId)) {
      return res.status(400).end();
    }

    const expense = {
      id: nextExpenseId++,
      userId,
      spentAt: data.spentAt,
      title: data.title,
      amount: data.amount,
      category: data.category,
      note: data.note,
    };

    expenses.push(expense);
    res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    let result = expenses.slice();

    if (req.query.userId !== undefined) {
      const userId = parseId(req.query.userId);

      result = result.filter((e) => e.userId === userId);
    }

    if (req.query.from || req.query.to) {
      const from = req.query.from ? new Date(req.query.from).getTime() : null;
      const to = req.query.to ? new Date(req.query.to).getTime() : null;

      result = result.filter((e) => {
        const t = new Date(e.spentAt).getTime();

        if (Number.isNaN(t)) {
          return false;
        }

        if (from !== null && t < from) {
          return false;
        }

        if (to !== null && t > to) {
          return false;
        }

        return true;
      });
    }

    if (req.query.categories !== undefined) {
      const categories = String(req.query.categories)
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);

      result = result.filter((e) => categories.includes(e.category));
    }

    res.json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);
    const expense = findById(expenses, id);

    if (!expense) {
      return res.status(404).end();
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);
    const expense = findById(expenses, id);

    if (!expense) {
      return res.status(404).end();
    }

    const p = req.body || {};

    if (p.userId !== undefined) {
      const userId = parseId(p.userId);

      if (!findById(users, userId)) {
        return res.status(400).end();
      }
      expense.userId = userId;
    }

    if (p.spentAt !== undefined) {
      expense.spentAt = p.spentAt;
    }

    if (p.title !== undefined) {
      expense.title = p.title;
    }

    if (p.amount !== undefined) {
      expense.amount = p.amount;
    }

    if (p.category !== undefined) {
      expense.category = p.category;
    }

    if (p.note !== undefined) {
      expense.note = p.note;
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);
    const idx = expenses.findIndex((e) => e.id === id);

    if (idx === -1) {
      return res.status(404).end();
    }

    expenses.splice(idx, 1);
    res.status(204).end();
  });

  return app;
}

module.exports = { createServer };
