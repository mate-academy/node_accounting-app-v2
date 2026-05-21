'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  // In-memory storage
  const users = [];
  const expenses = [];

  let userIdCounter = 1;
  let expenseIdCounter = 1;

  // Users
  app.post('/users', (req, res) => {
    const { name } = req.body || {};

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const user = {
      id: userIdCounter++,
      name,
    };

    users.push(user);

    return res.status(201).json(user);
  });

  app.get('/users', (req, res) => {
    return res.json(users);
  });

  function findUser(id) {
    return users.find((u) => u.id === Number(id));
  }

  app.get('/users/:id', (req, res) => {
    const user = findUser(req.params.id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    return res.json(user);
  });

  app.put('/users/:id', (req, res) => {
    const user = findUser(req.params.id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    const { name } = req.body || {};

    if (!name) {
      return res.status(400).send('Name is required');
    }

    user.name = name;

    return res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = findUser(req.params.id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    const { name } = req.body || {};

    if (name !== undefined) {
      user.name = name;
    }

    return res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = users.findIndex((u) => u.id === id);

    if (idx === -1) {
      return res.status(404).send('Not found');
    }

    users.splice(idx, 1);

    return res.status(204).send();
  });

  // Expenses
  app.post('/expenses', (req, res) => {
    const body = req.body || {};
    const { userId, spentAt, title, amount, category, note } = body;

    if (
      userId === undefined ||
      spentAt === undefined ||
      title === undefined ||
      amount === undefined ||
      category === undefined ||
      note === undefined
    ) {
      return res.status(400).send('Missing required field');
    }

    const user = findUser(userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    const expense = {
      id: expenseIdCounter++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    let result = expenses.slice();

    const { userId, from, to, categories } = req.query || {};

    if (userId !== undefined) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    if (from !== undefined) {
      const fromDate = new Date(from);

      result = result.filter((e) => new Date(e.spentAt) >= fromDate);
    }

    if (to !== undefined) {
      const toDate = new Date(to);

      result = result.filter((e) => new Date(e.spentAt) <= toDate);
    }

    if (categories !== undefined) {
      const cats = String(categories).split(',');

      result = result.filter((e) => cats.includes(e.category));
    }

    return res.json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    return res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    const { userId, spentAt, title, amount, category, note } = req.body || {};

    if (userId !== undefined) {
      expense.userId = userId;
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

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = expenses.findIndex((e) => e.id === id);

    if (idx === -1) {
      return res.status(404).send('Not found');
    }

    expenses.splice(idx, 1);

    return res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
