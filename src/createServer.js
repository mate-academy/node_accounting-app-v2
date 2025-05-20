'use strict';

const express = require('express');
const app = express();

app.use(express.json()); // Middleware for parsing JSON

// In-memory data stores
const expenses = [];
const users = [];

// --- USERS ENDPOINTS ---
let userIdCounter = 1;
let expenseIdCounter = 1;

// POST /users - Create a user
app.post('/users', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const user = { id: userIdCounter++, name };

  users.push(user);
  res.status(201).json(user);
});

// GET /users - Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id - Get user by id
app.get('/users/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// PATCH /users/:id - Partial update user
app.patch('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (req.body.name !== undefined) {
    user.name = req.body.name;
  }

  res.status(200).json(user);
});

// PUT /users/:id - Update user
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  user.name = name;
  res.status(200).json(user);
});

// DELETE /users/:id - Delete user
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(index, 1);
  res.status(204).end();
});

// --- EXPENSES ENDPOINTS ---

// POST /expenses - Create an expense
app.post('/expenses', (req, res) => {
  const { title, amount, spentAt, category, note, userId } = req.body;

  if (!title || !amount || !spentAt || !category) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // If userId is provided, check if user exists
  if (userId !== undefined && !users.find((u) => u.id === userId)) {
    return res.status(400).json({ error: 'User not found' });
  }

  const newExpense = {
    id: expenseIdCounter++,
    title,
    amount,
    spentAt,
    category,
    note: note || '',
    userId: userId !== undefined ? userId : undefined,
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// GET /expenses - Retrieve all expenses (with filters)
app.get('/expenses', (req, res) => {
  let result = [...expenses];

  // Filter by userId
  if (req.query.userId) {
    result = result.filter((e) => e.userId === parseInt(req.query.userId));
  }

  // Filter by category
  if (req.query.category) {
    result = result.filter((e) => e.category === req.query.category);
  }

  if (req.query.categories) {
    const cats = req.query.categories.split(',');

    result = result.filter((e) => cats.includes(e.category));
  }

  // Filter by date range
  if (req.query.from || req.query.to) {
    result = result.filter((e) => {
      const date = new Date(e.spentAt);

      if (req.query.from && date < new Date(req.query.from)) {
        return false;
      }

      if (req.query.to && date > new Date(req.query.to)) {
        return false;
      }

      return true;
    });
  }

  res.json(result);
});

// GET /expenses/:id - Retrieve a single expense
app.get('/expenses/:id', (req, res) => {
  const expense = expenses.find((e) => e.id === parseInt(req.params.id));

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  res.json(expense);
});

app.patch('/expenses/:id', (req, res) => {
  const expenseId = parseInt(req.params.id);
  const expense = expenses.find((e) => e.id === expenseId);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  const allowedFields = [
    'title',
    'amount',
    'spentAt',
    'category',
    'note',
    'userId',
  ];

  for (const key of allowedFields) {
    if (req.body[key] !== undefined) {
      if (key === 'userId' && !users.find((u) => u.id === req.body.userId)) {
        return res.status(400).json({ error: 'User not found' });
      }
      expense[key] = req.body[key];
    }
  }

  res.status(200).json(expense);
});

// PUT /expenses/:id - Update an expense
app.put('/expenses/:id', (req, res) => {
  const expenseId = parseInt(req.params.id);
  const expense = expenses.find((e) => e.id === expenseId);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  const { title, amount, spentAt, category, note, userId } = req.body;

  if (!title || !amount || !spentAt || !category) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // If userId is provided, check if user exists
  if (userId !== undefined && !users.find((u) => u.id === userId)) {
    return res.status(400).json({ error: 'User not found' });
  }

  Object.assign(expense, {
    title,
    amount,
    spentAt,
    category,
    note: note || '',
    userId: userId !== undefined ? userId : undefined,
  });
  res.status(200).json(expense);
});

// DELETE /expenses/:id - Delete an expense
app.delete('/expenses/:id', (req, res) => {
  const index = expenses.findIndex((e) => e.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  expenses.splice(index, 1);
  res.status(204).end();
});

// --- TESTING ONLY: Reset all data (call from your test setup) ---
app.post('/__test__/reset', (req, res) => {
  users.length = 0;
  userIdCounter = 1;
  expenseIdCounter = 1;
  expenses.length = 0;
  res.status(204).end();
});

// Export the app instance (without calling app.listen)
module.exports = { createServer: () => app };
