'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  const parseId = (id) => {
    if (!/^\d+$/.test(id)) {
      return null;
    }

    const parsedId = Number(id);

    return Number.isSafeInteger(parsedId) ? parsedId : null;
  };

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body || {};

    if (typeof name !== 'string') {
      return res.sendStatus(400);
    }

    const user = {
      id: nextUserId++,
      name,
    };

    users.push(user);

    res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.sendStatus(400);
    }

    const user = users.find((item) => item.id === id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.sendStatus(400);
    }

    const user = users.find((item) => item.id === id);

    if (!user) {
      return res.sendStatus(404);
    }

    const { name } = req.body || {};

    if (typeof name !== 'string') {
      return res.sendStatus(400);
    }

    user.name = name;

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.sendStatus(400);
    }

    const userIndex = users.findIndex((item) => item.id === id);

    if (userIndex === -1) {
      return res.sendStatus(404);
    }

    users.splice(userIndex, 1);

    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let result = [...expenses];

    if (userId !== undefined) {
      const parsedUserId = Number(userId);

      if (!Number.isSafeInteger(parsedUserId)) {
        return res.sendStatus(400);
      }

      result = result.filter((expense) => expense.userId === parsedUserId);
    }

    if (categories !== undefined) {
      const categoryList = Array.isArray(categories)
        ? categories
        : [categories];

      result = result.filter((expense) => {
        return categoryList.some((category) => {
          return category.split(',').includes(expense.category);
        });
      });
    }

    if (from !== undefined) {
      const fromDate = Date.parse(from);

      if (Number.isNaN(fromDate)) {
        return res.sendStatus(400);
      }

      result = result.filter(
        (expense) => Date.parse(expense.spentAt) >= fromDate,
      );
    }

    if (to !== undefined) {
      const toDate = Date.parse(to);

      if (Number.isNaN(toDate)) {
        return res.sendStatus(400);
      }

      result = result.filter(
        (expense) => Date.parse(expense.spentAt) <= toDate,
      );
    }

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body || {};

    if (
      !Number.isSafeInteger(userId) ||
      typeof spentAt !== 'string' ||
      Number.isNaN(Date.parse(spentAt)) ||
      typeof title !== 'string' ||
      !Number.isInteger(amount) ||
      typeof category !== 'string' ||
      (note !== undefined && typeof note !== 'string')
    ) {
      return res.sendStatus(400);
    }

    const userExists = users.some((user) => user.id === userId);

    if (!userExists) {
      return res.sendStatus(404);
    }

    const expense = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      ...(note !== undefined && { note }),
    };

    expenses.push(expense);

    res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.sendStatus(400);
    }

    const expense = expenses.find((item) => item.id === id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.sendStatus(400);
    }

    const expense = expenses.find((item) => item.id === id);

    if (!expense) {
      return res.sendStatus(404);
    }

    const { spentAt, title, amount, category, note } = req.body || {};

    if (
      (spentAt !== undefined &&
        (typeof spentAt !== 'string' || Number.isNaN(Date.parse(spentAt)))) ||
      (title !== undefined && typeof title !== 'string') ||
      (amount !== undefined && !Number.isInteger(amount)) ||
      (category !== undefined && typeof category !== 'string') ||
      (note !== undefined && typeof note !== 'string')
    ) {
      return res.sendStatus(400);
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

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return res.sendStatus(400);
    }

    const expenseIndex = expenses.findIndex((item) => item.id === id);

    if (expenseIndex === -1) {
      return res.sendStatus(404);
    }

    expenses.splice(expenseIndex, 1);

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
