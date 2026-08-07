/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(express.json());

  app.get('/users', (req, res) => {
    return res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const userId = Number(req.params.id);

    if (Number.isNaN(userId)) {
      return res.sendStatus(400);
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.sendStatus(404);
    }

    return res.json(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = {
      id: nextUserId++,
      name,
    };

    users.push(newUser);

    return res.status(201).json(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);

    if (Number.isNaN(userId)) {
      return res.sendStatus(400);
    }

    const index = users.findIndex((u) => u.id === userId);

    if (index === -1) {
      return res.sendStatus(404);
    }

    users.splice(index, 1);

    return res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const { name } = req.body;

    if (Number.isNaN(userId)) {
      return res.sendStatus(400);
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.sendStatus(404);
    }

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.sendStatus(400);
    }

    user.name = name;

    return res.json(user);
  });

  app.get('/expenses', (req, res) => {
    let result = [...expenses];
    const { userId, category, categories, from, to } = req.query;

    if (userId !== undefined) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    if (category) {
      result = result.filter((e) => e.category === category);
    }

    if (categories) {
      const categoryList = Array.isArray(categories)
        ? categories
        : [categories];

      result = result.filter((e) => categoryList.includes(e.category));
    }

    if (from) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    return res.json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);

    if (Number.isNaN(expenseId)) {
      return res.sendStatus(400);
    }

    const expense = expenses.find((e) => e.id === expenseId);

    if (!expense) {
      return res.sendStatus(404);
    }

    return res.json(expense);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category ||
      note === undefined ||
      typeof userId !== 'number' ||
      typeof spentAt !== 'string' ||
      typeof title !== 'string' ||
      typeof amount !== 'number' ||
      typeof category !== 'string' ||
      typeof note !== 'string'
    ) {
      return res.sendStatus(400);
    }

    const userExist = users.some((u) => u.id === userId);

    if (!userExist) {
      return res.sendStatus(400);
    }

    const newExpense = {
      id: nextExpenseId++,
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    return res.status(201).json(newExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);

    if (Number.isNaN(expenseId)) {
      return res.sendStatus(400);
    }

    const index = expenses.findIndex((e) => e.id === expenseId);

    if (index === -1) {
      return res.sendStatus(404);
    }

    expenses.splice(index, 1);

    return res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);

    if (Number.isNaN(expenseId)) {
      return res.sendStatus(400);
    }

    const expense = expenses.find((e) => e.id === expenseId);

    if (!expense) {
      return res.sendStatus(404);
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (
      (spentAt !== undefined && typeof spentAt !== 'string') ||
      (title !== undefined && typeof title !== 'string') ||
      (amount !== undefined && typeof amount !== 'number') ||
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

    return res.json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
