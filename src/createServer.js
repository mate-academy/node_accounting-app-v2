'use strict';

const express = require('express');

function createServer() {
  const app = express();
  const router = express.Router();

  app.use(express.json());

  let user = [];

  let expense = [];

  router.get('/users', (req, res) => {
    res.status(200).json(user);
  });

  router.post('/users', (req, res) => {
    const name = req.body.name;

    if (typeof req.body.name !== 'string') {
      return res.sendStatus(400);
    }

    const newUser = { id: user.length, name: name };

    user.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users/:userId', (req, res) => {
    const id = Number(req.params.userId);

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const foundUser = user.find((u) => u.id === id);

    if (foundUser === undefined) {
      return res.sendStatus(404);
    }

    res.status(200).json(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const id = Number(req.params.userId);

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const foundUser = user.find((u) => u.id === id);

    if (foundUser === undefined) {
      return res.sendStatus(404);
    }

    user = user.filter((u) => u.id !== id);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', (req, res) => {
    const id = Number(req.params.userId);

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    if (typeof req.body.name !== 'string' || req.body.name.trim() === '') {
      return res.sendStatus(400);
    }

    const foundUser = user.find((u) => u.id === id);

    if (foundUser === undefined) {
      return res.sendStatus(404);
    }

    const index = user.findIndex((u) => u.id === id);

    user[index].name = req.body.name;
    res.status(200).json(user[index]);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    const userIdNum = userId != null && userId !== '' ? Number(userId) : null;

    /* eslint-disable indent */
    const categoryList = Array.isArray(categories)
      ? categories
      : typeof categories === 'string'
        ? categories
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
    /* eslint-enable indent */

    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    const filtered = expense.filter((exp) => {
      const matchUser = userIdNum == null || Number(exp.userId) === userIdNum;

      const matchCategory =
        categoryList.length === 0 || categoryList.includes(exp.category);

      const spent = new Date(exp.spentAt);
      const matchFrom = !fromDate || spent >= fromDate;
      const matchTo = !toDate || spent <= toDate;

      return matchUser && matchCategory && matchFrom && matchTo;
    });

    res.status(200).json(filtered);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category
    ) {
      return res.sendStatus(400);
    }

    const numericUserId = Number(userId);
    const foundUser = user.find((u) => u.id === numericUserId);

    if (foundUser === undefined) {
      return res.sendStatus(400);
    }

    const newExpense = {
      id: expense.length,
      userId: userId,
      spentAt: spentAt,
      title: title,
      amount: amount,
      category: category,
      ...(note ? { note } : {}),
    };

    expense.push(newExpense);
    res.status(201).json(expense[expense.length - 1]);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const foundExpense = expense.find((e) => e.id === id);

    if (foundExpense === undefined) {
      return res.sendStatus(404);
    }

    res.status(200).json(foundExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const foundExpense = expense.find((e) => e.id === id);

    if (foundExpense === undefined) {
      return res.sendStatus(404);
    }

    expense = expense.filter((e) => e.id !== id);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const { spentAt, title, amount, category, note } = req.body;

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const foundExpense = expense.find((e) => e.id === id);

    if (foundExpense === undefined) {
      return res.sendStatus(404);
    }

    const index = expense.findIndex((e) => e.id === id);

    const updates = {
      spentAt,
      title,
      amount,
      category,
      note,
    };

    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        expense[index][key] = updates[key];
      }
    });

    res.status(200).json(expense[index]);
  });

  app.use('/', router);

  return app;
}

module.exports = {
  createServer,
};
