'use strict';

const cors = require('cors');
const express = require('express');

const REQUIRED_EXPENSE_FIELDS = ['userId', 'spentAt', 'title', 'amount'];

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function isMissing(value) {
  return value === undefined || value === null || value === '';
}

function parseId(value) {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

function normalizeCategories(value) {
  if (value === undefined) {
    return [];
  }

  const values = Array.isArray(value) ? value : [value];

  return values
    .flatMap((item) => String(item).split(','))
    .map((item) => item.trim())
    .filter(Boolean);
}

function createServer() {
  const app = express();
  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(cors());
  app.use(express.json());

  app.post('/users', (req, res) => {
    const { name } = req.body || {};

    if (isMissing(name)) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const user = {
      id: nextUserId,
      name,
    };

    nextUserId += 1;
    users.push(user);

    res.status(201).json(user);
  });

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = parseId(req.params.id);
    const user = users.find((item) => item.id === id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.json(user);
  });

  const updateUser = (req, res) => {
    const id = parseId(req.params.id);
    const user = users.find((item) => item.id === id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    const { name } = req.body || {};

    if (isMissing(name)) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    user.name = name;

    res.json(user);
  };

  app.patch('/users/:id', updateUser);

  app.delete('/users/:id', (req, res) => {
    const id = parseId(req.params.id);
    const userIndex = users.findIndex((item) => item.id === id);

    if (userIndex === -1) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    users.splice(userIndex, 1);

    res.status(204).end();
  });

  app.post('/expenses', (req, res) => {
    const expenseData = req.body || {};
    const hasMissingField = REQUIRED_EXPENSE_FIELDS.some(
      (field) => !hasOwn(expenseData, field) || isMissing(expenseData[field]),
    );

    if (hasMissingField) {
      res.status(400).json({ message: 'Required expense data is missing' });

      return;
    }

    const userId = parseId(expenseData.userId);
    const userExists = users.some((user) => user.id === userId);

    if (!userExists) {
      res.status(400).json({ message: 'User not found' });

      return;
    }

    const expense = {
      id: nextExpenseId,
      ...expenseData,
      userId,
    };

    nextExpenseId += 1;
    expenses.push(expense);

    res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    const { userId: userIdQuery, from, to } = req.query;
    const categories = normalizeCategories(req.query.categories);
    let userId = null;

    if (userIdQuery !== undefined) {
      userId = parseId(userIdQuery);

      if (userId === null) {
        res.status(400).json({ message: 'Invalid userId' });

        return;
      }
    }

    const fromTime = from === undefined ? null : Date.parse(from);
    const toTime = to === undefined ? null : Date.parse(to);

    if (
      (from !== undefined && Number.isNaN(fromTime)) ||
      (to !== undefined && Number.isNaN(toTime))
    ) {
      res.status(400).json({ message: 'Invalid date range' });

      return;
    }

    const result = expenses.filter((expense) => {
      if (userId !== null && expense.userId !== userId) {
        return false;
      }

      if (categories.length > 0 && !categories.includes(expense.category)) {
        return false;
      }

      const spentAtTime = Date.parse(expense.spentAt);

      if (fromTime !== null && spentAtTime < fromTime) {
        return false;
      }

      if (toTime !== null && spentAtTime > toTime) {
        return false;
      }

      return true;
    });

    res.json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);
    const expense = expenses.find((item) => item.id === id);

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);
    const expense = expenses.find((item) => item.id === id);

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    const changes = { ...(req.body || {}) };

    if (hasOwn(changes, 'userId')) {
      const userId = parseId(changes.userId);
      const userExists = users.some((user) => user.id === userId);

      if (!userExists) {
        res.status(400).json({ message: 'User not found' });

        return;
      }

      changes.userId = userId;
    }

    Object.assign(expense, changes, { id: expense.id });

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);
    const expenseIndex = expenses.findIndex((item) => item.id === id);

    if (expenseIndex === -1) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    expenses.splice(expenseIndex, 1);

    res.status(204).end();
  });

  return app;
}

module.exports = {
  createServer,
};
