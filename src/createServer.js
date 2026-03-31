'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use(express.json());

  // In-memory storage
  const users = [];
  const expenses = [];
  let userIdCounter = 1;
  let expenseIdCounter = 1;

  // ==================== USERS ====================
  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('A more descriptive message');
    }

    const newUser = {
      id: userIdCounter++,
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex((u) => u.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).send('User not found');
    }

    users.splice(index, 1);
    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).send('User not found');
    }

    Object.assign(user, req.body);
    res.json(user);
  });

  // ==================== EXPENSES ====================

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let result = [...expenses];

    if (userId) {
      result = result.filter((e) => e.userId === Number(userId));
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

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!title || !userId || !spentAt || !amount || !category) {
      return res
        .status(400)
        .send(
          'Missing required fields: userId, spentAt, title, amount, category',
        );
    }

    const userExists = users.find((u) => u.id === Number(userId));

    if (!userExists) {
      return res.status(400).send('User not found');
    }

    const newExpenses = {
      id: expenseIdCounter++,
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note: note || '',
    };

    expenses.push(newExpenses);
    res.status(201).json(newExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const index = expenses.findIndex((e) => e.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).send('Expense not found');
    }

    expenses.splice(index, 1);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    Object.assign(expense, req.body);
    res.json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
