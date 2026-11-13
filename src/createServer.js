'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(express.json());

  // ---------- helpers ----------

  const parseId = (value) => {
    const id = Number(value);

    return Number.isInteger(id) ? id : null;
  };

  const isNonEmptyString = (value) =>
    typeof value === 'string' && value.trim() !== '';

  const isValidDate = (value) =>
    typeof value === 'string' && !Number.isNaN(Date.parse(value));

  const isValidAmount = (value) => Number.isInteger(value);

  // ---------- users ----------

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body || {};

    if (!isNonEmptyString(name)) {
      return res.status(400).json({ message: 'name is required' });
    }

    const user = { id: nextUserId++, name };

    users.push(user);
    res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({ message: 'id must be an integer' });
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({ message: 'id must be an integer' });
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body || {};

    if (!isNonEmptyString(name)) {
      return res.status(400).json({ message: 'name is required' });
    }

    user.name = name;
    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({ message: 'id must be an integer' });
    }

    const exists = users.some((u) => u.id === id);

    if (!exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    users = users.filter((u) => u.id !== id);
    res.sendStatus(204);
  });

  // ---------- expenses ----------

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    let result = expenses;

    if (userId !== undefined) {
      const parsedUserId = parseId(userId);

      if (parsedUserId === null) {
        return res.status(400).json({ message: 'userId must be an integer' });
      }

      result = result.filter((e) => e.userId === parsedUserId);
    }

    if (categories !== undefined) {
      const list = Array.isArray(categories) ? categories : [categories];

      result = result.filter((e) => list.includes(e.category));
    }

    if (from !== undefined) {
      if (!isValidDate(from)) {
        return res.status(400).json({ message: 'from must be a valid date' });
      }

      result = result.filter((e) => Date.parse(e.spentAt) >= Date.parse(from));
    }

    if (to !== undefined) {
      if (!isValidDate(to)) {
        return res.status(400).json({ message: 'to must be a valid date' });
      }

      result = result.filter((e) => Date.parse(e.spentAt) <= Date.parse(to));
    }

    res.status(200).json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body || {};

    if (
      !Number.isInteger(userId) ||
      !isValidDate(spentAt) ||
      !isNonEmptyString(title) ||
      !isValidAmount(amount) ||
      !isNonEmptyString(category)
    ) {
      return res.status(400).json({
        message: 'userId, spentAt, title, amount and category are required',
      });
    }

    const userExists = users.some((u) => u.id === userId);

    if (!userExists) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const expense = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
    };

    if (note !== undefined) {
      expense.note = note;
    }

    expenses.push(expense);
    res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({ message: 'id must be an integer' });
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({ message: 'id must be an integer' });
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { spentAt, title, amount, category, note } = req.body || {};

    if (spentAt !== undefined && !isValidDate(spentAt)) {
      return res.status(400).json({ message: 'spentAt must be a valid date' });
    }

    if (title !== undefined && !isNonEmptyString(title)) {
      return res.status(400).json({ message: 'title must be a string' });
    }

    if (amount !== undefined && !isValidAmount(amount)) {
      return res.status(400).json({ message: 'amount must be an integer' });
    }

    if (category !== undefined && !isNonEmptyString(category)) {
      return res.status(400).json({ message: 'category must be a string' });
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.status(400).json({ message: 'id must be an integer' });
    }

    const exists = expenses.some((e) => e.id === id);

    if (!exists) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses = expenses.filter((e) => e.id !== id);
    res.sendStatus(204);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ message: 'Invalid JSON' });
    }

    res.status(500).json({ message: 'Internal server error' });
  });

  return app;
}

module.exports = { createServer };
