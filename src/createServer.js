'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  let userIdSeq = 1;
  let expenseIdSeq = 1;

  const findUser = (id) => {
    return users.find((u) => u.id === id);
  };

  const findExpense = (id) => {
    return expenses.find((e) => e.id === id);
  };

  const toNum = (v) => {
    return Number.parseInt(v, 10);
  };

  app.post('/users', (req, res) => {
    const body = req.body || {};
    const name = body.name;

    if (!name) {
      return res.status(400).json({ message: 'name is required' });
    }

    const user = { id: (userIdSeq += 1), name };

    users.push(user);

    return res.status(201).json(user);
  });

  app.get('/users', (_req, res) => {
    return res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = toNum(req.params.id);
    const user = findUser(id);

    if (!user) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = toNum(req.params.id);
    const user = findUser(id);

    if (!user) {
      return res.status(404).json({ message: 'Not found' });
    }

    const body = req.body || {};
    const name = body.name;

    if (typeof name !== 'undefined') {
      user.name = name;
    }

    return res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = toNum(req.params.id);
    const idx = users.findIndex((u) => u.id === id);

    if (idx === -1) {
      return res.status(404).json({ message: 'Not found' });
    }

    users.splice(idx, 1);

    for (let i = expenses.length - 1; i >= 0; i -= 1) {
      if (expenses[i].userId === id) {
        expenses.splice(i, 1);
      }
    }

    return res.status(204).end();
  });

  app.post('/expenses', (req, res) => {
    const body = req.body || {};

    const required = [
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];

    for (const key of required) {
      if (typeof body[key] === 'undefined') {
        return res.status(400).json({ message: `${key} is required` });
      }
    }

    const userId = Number(body.userId);

    if (!Number.isFinite(userId) || !findUser(userId)) {
      return res.status(400).json({ message: 'user not found' });
    }

    const expense = {
      id: (expenseIdSeq += 1),
      userId,
      spentAt: String(body.spentAt),
      title: String(body.title),
      amount: Number(body.amount),
      category: String(body.category),
      note: String(body.note),
    };

    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    const userIdQ = req.query.userId;
    const fromQ = req.query.from;
    const toQ = req.query.to;
    const categoriesQ = req.query.categories;

    let result = expenses.slice();

    if (typeof userIdQ !== 'undefined') {
      const uid = Number(userIdQ);

      result = result.filter((e) => {
        return e.userId === uid;
      });
    }

    if (fromQ || toQ) {
      const fromMs = fromQ ? Date.parse(fromQ) : Number.NEGATIVE_INFINITY;

      const toMs = toQ ? Date.parse(toQ) : Number.POSITIVE_INFINITY;

      result = result.filter((e) => {
        const t = Date.parse(e.spentAt);

        return t >= fromMs && t <= toMs;
      });
    }

    if (categoriesQ) {
      const set = new Set(
        String(categoriesQ)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      );

      result = result.filter((e) => {
        return set.has(e.category);
      });
    }

    return res.json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = toNum(req.params.id);
    const exp = findExpense(id);

    if (!exp) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.json(exp);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = toNum(req.params.id);
    const exp = findExpense(id);

    if (!exp) {
      return res.status(404).json({ message: 'Not found' });
    }

    const patch = req.body || {};

    if (typeof patch.userId !== 'undefined') {
      const uid = Number(patch.userId);

      if (!Number.isFinite(uid) || !findUser(uid)) {
        return res.status(400).json({ message: 'user not found' });
      }

      exp.userId = uid;
    }

    if (typeof patch.spentAt !== 'undefined') {
      exp.spentAt = String(patch.spentAt);
    }

    if (typeof patch.title !== 'undefined') {
      exp.title = String(patch.title);
    }

    if (typeof patch.amount !== 'undefined') {
      exp.amount = Number(patch.amount);
    }

    if (typeof patch.category !== 'undefined') {
      exp.category = String(patch.category);
    }

    if (typeof patch.note !== 'undefined') {
      exp.note = String(patch.note);
    }

    return res.json(exp);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = toNum(req.params.id);
    const idx = expenses.findIndex((e) => e.id === id);

    if (idx === -1) {
      return res.status(404).json({ message: 'Not found' });
    }

    expenses.splice(idx, 1);

    return res.status(204).end();
  });

  return app;
}

module.exports = { createServer };
