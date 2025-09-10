'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  const parseInteger = (value) => {
    if (value === undefined) {
      return undefined;
    }

    const n = Number(value);

    return Number.isInteger(n) ? n : NaN;
  };

  const send400 = (res, message = 'Bad Request') => {
    res.status(400).json({ message });
  };

  const send404 = (res, message = 'Not Found') => {
    res.status(404).json({ message });
  };

  // USERS
  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body || {};

    if (!name) {
      send400(res, 'name is required');

      return;
    }

    const user = { id: nextUserId++, name };

    users.push(user);
    res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const id = parseInteger(req.params.id);

    if (Number.isNaN(id)) {
      send400(res, 'id should be integer');

      return;
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      send404(res, 'user not found');

      return;
    }
    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = parseInteger(req.params.id);

    if (Number.isNaN(id)) {
      send400(res, 'id should be integer');

      return;
    }

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      send404(res, 'user not found');

      return;
    }
    users.splice(index, 1);
    res.status(204).send();
  });

  app.patch('/users/:id', (req, res) => {
    const id = parseInteger(req.params.id);

    if (Number.isNaN(id)) {
      send400(res, 'id should be integer');

      return;
    }

    const { name } = req.body || {};

    if (!name) {
      send400(res, 'name is required');

      return;
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      send404(res, 'user not found');

      return;
    }
    user.name = name;
    res.json(user);
  });

  // EXPENSES
  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    if (userId !== undefined && Number.isNaN(parseInteger(userId))) {
      send400(res, 'userId should be integer');

      return;
    }

    let cats;

    if (categories !== undefined) {
      if (Array.isArray(categories)) {
        cats = categories.flatMap((c) => String(c).split(','));
      } else {
        cats = String(categories).split(',');
      }
    }

    if ((from && isNaN(Date.parse(from))) || (to && isNaN(Date.parse(to)))) {
      send400(res, 'from/to should be valid date-time');

      return;
    }

    let result = expenses.slice();

    if (userId !== undefined) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    if (cats !== undefined) {
      result = result.filter((e) => cats.includes(e.category));
    }

    if (from !== undefined) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to !== undefined) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body || {};

    // tests requires send400 not send404 for user not found

    if (userId === undefined) {
      send400(res, 'userId is required');

      return;
    }

    if (!Number.isInteger(Number(userId))) {
      send400(res, 'userId should be integer');

      return;
    }

    if (!spentAt) {
      send400(res, 'spentAt is required');

      return;
    }

    if (isNaN(Date.parse(spentAt))) {
      send400(res, 'spentAt should be date-time');

      return;
    }

    if (!title) {
      send400(res, 'title is required');

      return;
    }

    if (amount === undefined) {
      send400(res, 'amount is required');

      return;
    }

    if (!Number.isInteger(Number(amount))) {
      send400(res, 'amount should be integer');

      return;
    }

    if (!category) {
      send400(res, 'category is required');

      return;
    }

    // tests requires send400 not send404 for user not found
    const userExists = users.some((u) => u.id === Number(userId));

    if (!userExists) {
      send400(res, 'user not found');

      return;
    }

    const expense = {
      id: nextExpenseId++,
      userId: Number(userId),
      spentAt: new Date(spentAt).toISOString(),
      title,
      amount: Number(amount),
      category,
    };

    if (note !== undefined) {
      expense.note = note;
    }

    expenses.push(expense);
    res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = parseInteger(req.params.id);

    if (!Number.isInteger(id)) {
      send400(res, 'id should be integer');

      return;
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      send404(res, 'expense not found');

      return;
    }
    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = parseInteger(req.params.id);

    if (!Number.isInteger(id)) {
      send400(res, 'id should be integer');

      return;
    }

    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      send404(res, 'expense not found');

      return;
    }
    expenses.splice(index, 1);
    res.status(204).send();
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = parseInteger(req.params.id);

    if (!Number.isInteger(id)) {
      send400(res, 'id should be integer');

      return;
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      send404(res, 'expense not found');

      return;
    }

    const { spentAt, title, amount, category, note } = req.body || {};

    if (spentAt !== undefined) {
      if (isNaN(Date.parse(spentAt))) {
        send400(res, 'spentAt should be date-time');

        return;
      }
      expense.spentAt = new Date(spentAt).toISOString();
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      if (!Number.isInteger(Number(amount))) {
        send400(res, 'amount should be integer');

        return;
      }
      expense.amount = Number(amount);
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    res.json(expense);
  });

  return app;
}

module.exports = { createServer };
