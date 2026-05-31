'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  // In-memory storage
  const users = [];
  const expenses = [];

  // ─── USERS ──────────────────────────────────────
  // GET /users
  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  // POST /users
  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newUser = {
      id: Date.now(),
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  // GET /users/:id
  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  });

  // PATCH /users/:id
  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    if (name !== undefined) {
      user.name = name;
    }

    res.status(200).json(user);
  });

  // DELETE /users/:id
  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(index, 1);
    res.sendStatus(204);
  });

  // ─── EXPENSES ─────────────

  // GET /expenses
  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let result = [...expenses];

    if (userId !== undefined) {
      result = result.filter((e) => String(e.userId) === String(userId));
    }

    if (categories !== undefined) {
      result = result.filter((e) => e.category === categories);
    }

    if (from !== undefined) {
      const fromDate = new Date(from);

      result = result.filter((e) => new Date(e.spentAt) >= fromDate);
    }

    if (to !== undefined) {
      const toDate = new Date(to);

      result = result.filter((e) => new Date(e.spentAt) <= toDate);
    }

    res.status(200).json(result);
  });

  // POST /expenses
  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || amount === undefined || !category) {
      return res.status(400).json({
        message: 'userId, spentAt, title, amount and category are required',
      });
    }

    const user = users.find((u) => u.id === Number(userId));

    if (!user) {
      return res
        .status(400)
        .json({ message: 'User with given id does not exist' });
    }

    const newExpense = {
      id: Date.now(),
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note: note || '',
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  // GET /expenses/:id
  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(expense);
  });

  // PATCH /expenses/:id
  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { spentAt, title, amount, category, note } = req.body;

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

  // DELETE /expenses/:id
  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses.splice(index, 1);
    res.sendStatus(204);
  });

  return app;
}

module.exports = { createServer };
