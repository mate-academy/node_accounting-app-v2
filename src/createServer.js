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

  /** ---------------- USERS ---------------- */
  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const user = {
      id: userIdCounter++,
      name,
    };

    users.push(user);
    res.status(201).json(user);
  });

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    user.name = name;
    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex((u) => u.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(index, 1);
    res.status(204).end();
  });

  /** ---------------- EXPENSES ---------------- */
  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    // Check required fields
    if (!userId || !spentAt || !title || amount == null || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user exists
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const expense = {
      id: expenseIdCounter++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note || null,
    };

    expenses.push(expense);
    res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    let filteredExpenses = [...expenses];

    // Filter by userId if provided
    if (req.query.userId) {
      const userId = parseInt(req.query.userId);

      filteredExpenses = filteredExpenses.filter((e) => e.userId === userId);
    }

    // Filter by category if provided
    if (req.query.categories) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.category === req.query.categories,
      );
    }

    // Filter by date range if provided
    if (req.query.from && req.query.to) {
      const from = new Date(req.query.from);
      const to = new Date(req.query.to);

      filteredExpenses = filteredExpenses.filter((e) => {
        const spentDate = new Date(e.spentAt);

        return spentDate >= from && spentDate <= to;
      });
    }

    res.json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === parseInt(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === parseInt(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    // If userId is provided, check if user exists
    if (userId !== undefined) {
      const user = users.find((u) => u.id === userId);

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      expense.userId = userId;
    }

    // Update other fields if provided
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
    const index = expenses.findIndex((e) => e.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses.splice(index, 1);
    res.status(204).end();
  });

  return app;
}

module.exports = { createServer };
