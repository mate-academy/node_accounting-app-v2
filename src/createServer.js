'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  let nextUserId = 1;
  const expenses = [];
  let nextExpenseId = 1;

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body || {};

    if (name === undefined) {
      return res.status(400).send('Bad request');
    }

    const user = {
      id: nextUserId,
      name,
    };

    nextUserId += 1;
    users.push(user);

    return res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).send('Bad request');
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    return res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).send('Bad request');
    }

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).send('Not found');
    }

    users.splice(index, 1);

    return res.status(204).send();
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).send('Bad request');
    }

    const { name } = req.body || {};

    if (name === undefined) {
      return res.status(400).send('Bad request');
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    user.name = name;

    return res.status(200).json(user);
  });

  app.get('/expenses', (req, res) => {
    let result = [...expenses];

    if (req.query.userId !== undefined) {
      const userId = Number(req.query.userId);

      if (!Number.isInteger(userId)) {
        return res.status(400).send('Bad request');
      }

      result = result.filter((e) => e.userId === userId);
    }

    if (req.query.categories !== undefined) {
      const categories = Array.isArray(req.query.categories)
        ? req.query.categories
        : [req.query.categories];

      result = result.filter((e) => categories.includes(e.category));
    }

    if (req.query.from !== undefined) {
      const fromMs = Date.parse(req.query.from);

      if (Number.isNaN(fromMs)) {
        return res.status(400).send('Bad request');
      }

      result = result.filter((e) => Date.parse(e.spentAt) >= fromMs);
    }

    if (req.query.to !== undefined) {
      const toMs = Date.parse(req.query.to);

      if (Number.isNaN(toMs)) {
        return res.status(400).send('Bad request');
      }

      result = result.filter((e) => Date.parse(e.spentAt) <= toMs);
    }

    return res.status(200).json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body || {};

    if (
      userId === undefined ||
      spentAt === undefined ||
      title === undefined ||
      amount === undefined ||
      category === undefined
    ) {
      return res.status(400).send('Bad request');
    }

    const userIdNum = Number(userId);
    const amountNum = Number(amount);
    const spentAtMs = Date.parse(spentAt);

    if (
      !Number.isInteger(userIdNum) ||
      !Number.isInteger(amountNum) ||
      Number.isNaN(spentAtMs)
    ) {
      return res.status(400).send('Bad request');
    }

    const userExists = users.some((u) => u.id === userIdNum);

    if (!userExists) {
      return res.status(400).send('Not found');
    }

    const expense = {
      id: nextExpenseId,
      userId: userIdNum,
      spentAt,
      title,
      amount: amountNum,
      category,
    };

    if (note !== undefined) {
      expense.note = note;
    }

    nextExpenseId += 1;
    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).send('Bad request');
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    return res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).send('Bad request');
    }

    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).send('Not found');
    }

    expenses.splice(index, 1);

    return res.status(204).send();
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).send('Bad request');
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    const { spentAt, title, amount, category, note } = req.body || {};

    if (spentAt !== undefined) {
      const spentAtMs = Date.parse(spentAt);

      if (Number.isNaN(spentAtMs)) {
        return res.status(400).send('Bad request');
      }

      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      const amountNum = Number(amount);

      if (!Number.isInteger(amountNum)) {
        return res.status(400).send('Bad request');
      }

      expense.amount = amountNum;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    return res.status(200).json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
