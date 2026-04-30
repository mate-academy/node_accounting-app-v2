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

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = {
      id: nextUserId++,
      name,
    };

    users.push(user);
    res.status(201).json(user);
  });

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((item) => item.id === id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const userIndex = users.findIndex((item) => item.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users[userIndex].name = name;
    res.status(200).json(users[userIndex]);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((item) => item.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);

    res.status(204).send();
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User Id is required' });
    }

    const userExists = users.some((u) => u.id === Number(userId));

    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    const expense = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);
    res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    let result = expenses;

    if (req.query.userId) {
      const targetUserId = Number(req.query.userId);

      result = result.filter((item) => item.userId === targetUserId);
    }

    if (req.query.from) {
      const fromDate = new Date(req.query.from);

      result = result.filter((item) => new Date(item.spentAt) >= fromDate);
    }

    if (req.query.to) {
      const toDate = new Date(req.query.to);

      result = result.filter((item) => new Date(item.spentAt) <= toDate);
    }

    if (req.query.categories) {
      const categories = req.query.categories.split(',');

      result = result.filter((item) => categories.includes(item.category));
    }

    res.status(200).json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((item) => item.id === id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expenseIndex = expenses.findIndex((item) => item.id === id);

    if (expenseIndex === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expenses[expenseIndex] = {
      ...expenses[expenseIndex],
      ...req.body,
    };

    res.status(200).json(expenses[expenseIndex]);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expenseIndex = expenses.findIndex((item) => item.id === id);

    if (expenseIndex === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expenses.splice(expenseIndex, 1);

    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
