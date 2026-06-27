'use strict';

const express = require('express');

function createServer() {
  const app = express();
  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  const isNonEmptyString = (value) =>
    typeof value === 'string' && value.trim() !== '';

  const isPositiveInteger = (value) =>
    typeof value === 'number' && Number.isInteger(value) && value > 0;

  const isValidDateString = (value) =>
    typeof value === 'string' &&
    value.trim() !== '' &&
    !Number.isNaN(Date.parse(value));

  const parsePositiveIntegerParam = (value, res, name = 'id') => {
    if (typeof value !== 'string' || !/^\d+$/.test(value.trim())) {
      res.status(400).send(`${name} must be a positive integer`);

      return null;
    }

    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
      res.status(400).send(`${name} must be a positive integer`);

      return null;
    }

    return parsedValue;
  };

  const validateExpensePayload = (body, mustIncludeAllFields = true) => {
    if (mustIncludeAllFields) {
      if (body.userId === undefined) {
        return 'userId is required';
      }

      if (body.spentAt === undefined) {
        return 'spentAt is required';
      }

      if (body.title === undefined) {
        return 'title is required';
      }

      if (body.amount === undefined) {
        return 'amount is required';
      }

      if (body.category === undefined) {
        return 'category is required';
      }

      if (body.note === undefined) {
        return 'note is required';
      }
    }

    if (body.userId !== undefined && !isPositiveInteger(body.userId)) {
      return 'userId must be a positive integer';
    }

    if (body.spentAt !== undefined && !isValidDateString(body.spentAt)) {
      return 'spentAt must be a valid date string';
    }

    if (body.title !== undefined && !isNonEmptyString(body.title)) {
      return 'title must be a non-empty string';
    }

    if (body.amount !== undefined && !Number.isFinite(body.amount)) {
      return 'amount must be a number';
    }

    if (body.category !== undefined && !isNonEmptyString(body.category)) {
      return 'category must be a non-empty string';
    }

    if (body.note !== undefined && !isNonEmptyString(body.note)) {
      return 'note must be a non-empty string';
    }

    return null;
  };

  app.use(express.json());

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!isNonEmptyString(name)) {
      return res.status(400).send('Name is required');
    }

    const user = {
      id: nextUserId,
      name,
    };

    nextUserId += 1;
    users.push(user);

    return res.status(201).json(user);
  });

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.get('/users/:userId', (req, res) => {
    const userId = parsePositiveIntegerParam(req.params.userId, res, 'userId');

    if (userId === null) {
      return;
    }

    const user = users.find(({ id }) => id === userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    return res.status(200).json(user);
  });

  app.patch('/users/:userId', (req, res) => {
    const userId = parsePositiveIntegerParam(req.params.userId, res, 'userId');

    if (userId === null) {
      return;
    }

    const user = users.find(({ id }) => id === userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const { name } = req.body;

    if (!isNonEmptyString(name)) {
      return res.status(400).send('Name is required');
    }

    user.name = name;

    return res.status(200).json(user);
  });

  app.delete('/users/:userId', (req, res) => {
    const userId = parsePositiveIntegerParam(req.params.userId, res, 'userId');

    if (userId === null) {
      return;
    }

    const userIndex = users.findIndex(({ id }) => id === userId);

    if (userIndex === -1) {
      return res.status(404).send('User not found');
    }

    users.splice(userIndex, 1);

    return res.status(204).send();
  });

  app.post('/expenses', (req, res) => {
    const validationError = validateExpensePayload(req.body);

    if (validationError) {
      return res.status(400).send(validationError);
    }

    const { userId, spentAt, title, amount, category, note } = req.body;
    const user = users.find(({ id }) => id === userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    const expense = {
      id: nextExpenseId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    nextExpenseId += 1;
    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    if (userId !== undefined) {
      const parsedUserId = parsePositiveIntegerParam(userId, res, 'userId');

      if (parsedUserId === null) {
        return;
      }
    }

    if (from !== undefined && !isValidDateString(from)) {
      return res.status(400).send('from must be a valid date');
    }

    if (to !== undefined && !isValidDateString(to)) {
      return res.status(400).send('to must be a valid date');
    }

    const categoryFilters = Array.isArray(categories)
      ? categories
      : categories
        ? categories.split(',')
        : [];

    const filteredExpenses = expenses.filter((expense) => {
      const matchesUserId =
        userId === undefined || expense.userId === Number(userId);
      const matchesFrom = !from || new Date(expense.spentAt) >= new Date(from);
      const matchesTo = !to || new Date(expense.spentAt) <= new Date(to);
      const matchesCategories =
        categoryFilters.length === 0 ||
        categoryFilters.includes(expense.category);

      return matchesUserId && matchesFrom && matchesTo && matchesCategories;
    });

    return res.status(200).json(filteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expenseId = parsePositiveIntegerParam(
      req.params.expenseId,
      res,
      'expenseId',
    );

    if (expenseId === null) {
      return;
    }

    const expense = expenses.find(({ id }) => id === expenseId);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    return res.status(200).json(expense);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const expenseId = parsePositiveIntegerParam(
      req.params.expenseId,
      res,
      'expenseId',
    );

    if (expenseId === null) {
      return;
    }

    const expense = expenses.find(({ id }) => id === expenseId);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    const validationError = validateExpensePayload(req.body, false);

    if (validationError) {
      return res.status(400).send(validationError);
    }

    if (req.body.userId !== undefined) {
      const user = users.find(({ id }) => id === req.body.userId);

      if (!user) {
        return res.status(400).send('User not found');
      }

      expense.userId = req.body.userId;
    }

    if (req.body.spentAt !== undefined) {
      expense.spentAt = req.body.spentAt;
    }

    if (req.body.title !== undefined) {
      expense.title = req.body.title;
    }

    if (req.body.amount !== undefined) {
      expense.amount = req.body.amount;
    }

    if (req.body.category !== undefined) {
      expense.category = req.body.category;
    }

    if (req.body.note !== undefined) {
      expense.note = req.body.note;
    }

    return res.status(200).json(expense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const expenseId = parsePositiveIntegerParam(
      req.params.expenseId,
      res,
      'expenseId',
    );

    if (expenseId === null) {
      return;
    }

    const expenseIndex = expenses.findIndex(({ id }) => id === expenseId);

    if (expenseIndex === -1) {
      return res.status(404).send('Expense not found');
    }

    expenses.splice(expenseIndex, 1);

    return res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
