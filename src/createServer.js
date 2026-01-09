'use strict';

const express = require('express');
const bodyParser = require('body-parser');

function createServer() {
  const app = express();

  app.use(bodyParser.json());

  const users = [];
  const expenses = [];

  let userId = 1;
  let expenseId = 1;

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Missing name' });
    }

    const newUser = { id: userId++, name };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Missing name' });
    }

    user.name = name;
    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex((u) => u.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(index, 1);
    res.status(204).send();
  });

  app.get('/expenses', (req, res) => {
    let result = expenses;

    const { userId: userIdFromBody, from, to, categories } = req.query;

    if (userIdFromBody) {
      result = result.filter((e) => e.userId === Number(userIdFromBody));
    }

    if (from) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    if (categories) {
      const catList = Array.isArray(categories)
        ? categories
        : categories.split(',');

      result = result.filter((e) => catList.includes(e.category));
    }

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const {
      userId: userIdFromBody,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    if (
      typeof userIdFromBody !== 'number' ||
      typeof spentAt !== 'string' ||
      typeof title !== 'string' ||
      title.trim() === '' ||
      typeof amount !== 'number' ||
      typeof category !== 'string' ||
      category.trim() === '' ||
      (note !== undefined && typeof note !== 'string')
    ) {
      return res
        .status(400)
        .json({ message: 'Missing or invalid required fields' });
    }

    const user = users.find((u) => u.id === userIdFromBody);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newExpense = {
      id: expenseId++,
      userId: userIdFromBody,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (
      (spentAt !== undefined && typeof spentAt !== 'string') ||
      (title !== undefined &&
        (typeof title !== 'string' || title.trim() === '')) ||
      (amount !== undefined && typeof amount !== 'number') ||
      (category !== undefined &&
        (typeof category !== 'string' || category.trim() === '')) ||
      (note !== undefined && typeof note !== 'string')
    ) {
      return res
        .status(400)
        .json({ message: 'Missing or invalid required fields' });
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
    const index = expenses.findIndex((e) => e.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    expenses.splice(index, 1);
    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
