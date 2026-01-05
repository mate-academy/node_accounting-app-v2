'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  function parseId(value) {
    const id = Number(value);

    if (!Number.isInteger(id) || id <= 0) {
      return null;
    }

    return id;
  }

  function isValidDateTime(value) {
    if (typeof value !== 'string') {
      return false;
    }

    const time = Date.parse(value);

    return Number.isFinite(time);
  }

  function sendBadRequest(res, message) {
    res.status(400).json({ message });
  }

  function sendNotFound(res, message) {
    res.status(404).json({ message });
  }

  function findUserById(id) {
    return users.find((user) => user.id === id) || null;
  }

  function findExpenseById(id) {
    return expenses.find((e) => e.id === id) || null;
  }

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const body = req.body;

    if (!body || typeof body !== 'object') {
      return sendBadRequest(res, 'Request body is required');
    }

    const { name } = body;

    if (typeof name !== 'string' || name.trim() === '') {
      return sendBadRequest(res, 'Field "name" is required');
    }

    const newUser = {
      id: nextUserId,
      name: name.trim(),
    };

    nextUserId += 1;
    users.push(newUser);

    res.status(201).json(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const user = findUserById(id);

    if (!user) {
      return sendNotFound(res, 'User not found');
    }

    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const user = findUserById(id);

    if (!user) {
      return sendNotFound(res, 'User not found');
    }

    const body = req.body;

    if (!body || typeof body !== 'object') {
      return sendBadRequest(res, 'Request body is required');
    }

    if (typeof body.name !== 'string' || body.name.trim() === '') {
      return sendBadRequest(res, 'Field "name" is required');
    }

    user.name = body.name.trim();

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return sendNotFound(res, 'User not found');
    }

    users.splice(index, 1);

    for (let i = expenses.length - 1; i >= 0; i -= 1) {
      if (expenses[i].userId === id) {
        expenses.splice(i, 1);
      }
    }

    res.status(204).send();
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let result = [...expenses];

    if (userId !== undefined) {
      const parseUserId = parseId(userId);

      if (parseUserId === null) {
        return sendBadRequest(res, 'Invalid userId');
      }

      result = result.filter((e) => e.userId === parseUserId);
    }

    if (categories !== undefined) {
      let categoriesList = categories;

      if (typeof categoriesList === 'string') {
        /* eslint-disable prettier/prettier */
        categoriesList = categoriesList.includes(',')
          ? categoriesList
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
          : [categoriesList];
        /* eslint-enable prettier/prettier */
      }

      const normalized = categoriesList
        .map((v) => (typeof v === 'string' ? v.trim() : ''))
        .filter(Boolean);

      result = result.filter((e) => normalized.includes(e.category));
    }

    if (from !== undefined) {
      if (!isValidDateTime(from)) {
        return sendBadRequest(res, 'Invalid "from" date-time');
      }

      const fromTime = Date.parse(from);

      result = result.filter((e) => Date.parse(e.spentAt) >= fromTime);
    }

    if (to !== undefined) {
      if (!isValidDateTime(to)) {
        return sendBadRequest(res, 'Invalid "to" date-time');
      }

      const toTime = Date.parse(to);

      result = result.filter((e) => Date.parse(e.spentAt) <= toTime);
    }

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const body = req.body;

    if (!body || typeof body !== 'object') {
      return sendBadRequest(res, 'Request body is required');
    }

    const { userId, spentAt, title, amount, category, note } = body;

    const parsedUserId = parseId(userId);

    if (parsedUserId === null) {
      return sendBadRequest(
        res,
        'Field "userId" is required and must be integer',
      );
    }

    if (!findUserById(parsedUserId)) {
      return sendBadRequest(res, 'User not found');
    }

    if (!isValidDateTime(spentAt)) {
      return sendBadRequest(
        res,
        'Field "spentAt" must be a valid date-time string',
      );
    }

    if (typeof title !== 'string' || title.trim() === '') {
      return sendBadRequest(res, 'Field "title" is required');
    }

    const parsedAmount = Number(amount);

    if (!Number.isInteger(parsedAmount)) {
      return sendBadRequest(res, 'Field "amount" must be integer');
    }

    if (typeof category !== 'string' || category.trim() === '') {
      return sendBadRequest(res, 'Field "category" is required');
    }

    if (note !== undefined && note !== null && typeof note !== 'string') {
      return sendBadRequest(res, 'Field "note" must be string');
    }

    const newExpense = {
      id: nextExpenseId,
      userId: parsedUserId,
      spentAt,
      title: title.trim(),
      amount: parsedAmount,
      category: category.trim(),
    };

    if (note !== undefined && note !== null) {
      newExpense.note = note;
    }

    nextExpenseId += 1;
    expenses.push(newExpense);

    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const expense = findExpenseById(id);

    if (!expense) {
      return sendNotFound(res, 'Expense not found');
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const expense = findExpenseById(id);

    if (!expense) {
      return sendNotFound(res, 'Expense not found');
    }

    const body = req.body;

    if (!body || typeof body !== 'object') {
      return sendBadRequest(res, 'Request body is required');
    }

    if (Object.prototype.hasOwnProperty.call(body, 'spentAt')) {
      if (!isValidDateTime(body.spentAt)) {
        return sendBadRequest(res, 'Field "spentAt" must be valid date-time');
      }

      expense.spentAt = body.spentAt;
    }

    if (Object.prototype.hasOwnProperty.call(body, 'title')) {
      if (typeof body.title !== 'string' || body.title.trim() === '') {
        return sendBadRequest(res, 'Field "title" must be non-empty string');
      }

      expense.title = body.title.trim();
    }

    if (Object.prototype.hasOwnProperty.call(body, 'amount')) {
      const parsedAmount = Number(body.amount);

      if (!Number.isInteger(parsedAmount)) {
        return sendBadRequest(res, 'Field "amount" must be integer');
      }

      expense.amount = parsedAmount;
    }

    if (Object.prototype.hasOwnProperty.call(body, 'category')) {
      if (typeof body.category !== 'string' || body.category.trim() === '') {
        return sendBadRequest(res, 'Field "category" must be non-empty string');
      }

      expense.category = body.category.trim();
    }

    if (Object.prototype.hasOwnProperty.call(body, 'note')) {
      if (body.note === null) {
        delete expense.note;
      } else if (typeof body.note !== 'string') {
        return sendBadRequest(res, 'Field "note" must be string or null');
      } else {
        expense.note = body.note;
      }
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return sendNotFound(res, 'Expense not found');
    }

    expenses.splice(index, 1);

    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
