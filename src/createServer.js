'use strict';

const express = require('express');

function createServer() {
  const users = [];
  const expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.post('/users', (req, res) => {
    const newUser = req.body;

    if (
      !newUser.name ||
      typeof newUser.name !== 'string' ||
      !newUser.name.trim()
    ) {
      return res.status(400).json({ message: 'Name is required' });
    }

    newUser.id = nextUserId++;
    newUser.name = newUser.name.trim();

    users.push(newUser);

    return res.status(201).json(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updates = { ...req.body };

    delete updates.id;

    if ('name' in updates) {
      if (typeof updates.name !== 'string' || updates.name.trim() === '') {
        return res.status(400).json({ message: 'Invalid name' });
      }
      updates.name = updates.name.trim();
    }

    Object.assign(user, updates);

    return res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = users.findIndex((u) => u.id === id);

    if (idx === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(idx, 1);

    return res.status(204).send();
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to } = req.query;
    let result = expenses;

    if (userId !== undefined && String(userId).trim() !== '') {
      const uid = Number(userId);

      result = result.filter((e) => e.userId === uid);
    }

    const categoriesParam = req.query.category ?? req.query.categories;

    if (categoriesParam !== undefined && categoriesParam !== null) {
      let cats = categoriesParam;

      if (Array.isArray(cats)) {
        cats = cats.flat();
      } else if (typeof cats === 'string') {
        cats = cats.split(',');
      } else {
        cats = [String(cats)];
      }

      const wanted = cats
        .map((c) => String(c).trim().toLowerCase())
        .filter((c) => c.length > 0);

      result = result.filter(
        (e) =>
          typeof e.category === 'string' &&
          wanted.includes(e.category.trim().toLowerCase()),
      );
    }

    if (from) {
      const fromTs = Date.parse(from);

      if (!Number.isFinite(fromTs)) {
        return res.status(400).json({ message: 'Invalid "from" date' });
      }

      result = result.filter(
        (e) =>
          Number.isFinite(Date.parse(e.spentAt)) &&
          Date.parse(e.spentAt) >= fromTs,
      );
    }

    if (to) {
      const toTs = Date.parse(to);

      if (!Number.isFinite(toTs)) {
        return res.status(400).json({ message: 'Invalid "to" date' });
      }

      result = result.filter(
        (e) =>
          Number.isFinite(Date.parse(e.spentAt)) &&
          Date.parse(e.spentAt) <= toTs,
      );
    }

    return res.status(200).json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note, ...rest } =
      req.body || {};

    if (userId === undefined) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const uid = Number(userId);

    const userExists = users.some((u) => u.id === uid);

    if (!userExists) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'title is required' });
    }

    if (typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({ message: 'category is required' });
    }

    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ message: 'Amount must be a positive number' });
    }

    const spentTs = Date.parse(spentAt);

    if (!Number.isFinite(spentTs)) {
      return res
        .status(400)
        .json({ message: 'spentAt must be a valid ISO date' });
    }

    const newExpense = {
      id: nextExpenseId++,
      userId: uid,
      spentAt,
      title: title.trim(),
      amount,
      category: category.trim(),
      ...(typeof note === 'string' ? { note } : {}),
      ...rest,
    };

    expenses.push(newExpense);

    return res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.status(200).json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const updates = { ...req.body };

    delete updates.id;

    if ('amount' in updates) {
      if (
        typeof updates.amount !== 'number' ||
        !Number.isFinite(updates.amount) ||
        updates.amount <= 0
      ) {
        return res
          .status(400)
          .json({ message: 'Amount must be a positive number' });
      }
    }

    if ('spentAt' in updates) {
      const ts = Date.parse(updates.spentAt);

      if (!Number.isFinite(ts)) {
        return res
          .status(400)
          .json({ message: 'spentAt must be a valid ISO date' });
      }
    }

    if ('title' in updates) {
      if (typeof updates.title !== 'string' || updates.title.trim() === '') {
        return res.status(400).json({ message: 'Invalid title' });
      }
      updates.title = updates.title.trim();
    }

    if ('category' in updates) {
      if (
        typeof updates.category !== 'string' ||
        updates.category.trim() === ''
      ) {
        return res.status(400).json({ message: 'Invalid category' });
      }
      updates.category = updates.category.trim();
    }

    if ('userId' in updates) {
      const newUid = Number(updates.userId);
      const exists = users.some((u) => u.id === newUid);

      if (!exists) {
        return res.status(400).json({ message: 'User not found' });
      }
      updates.userId = newUid;
    }

    Object.assign(expense, updates);

    return res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = expenses.findIndex((e) => e.id === id);

    if (idx === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses.splice(idx, 1);

    return res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
