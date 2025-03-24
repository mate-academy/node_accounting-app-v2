const express = require('express');
const router = express.Router();

const { users } = require('./users');

const expenses = [];
let nextExpenseId = 1;

// Clear users array for testing
router.clearUsers = () => {
  users.length = 0;
};

// Clear expenses array for testing
router.clearExpenses = () => {
  expenses.length = 0;
  nextExpenseId = 1;
};

// GET /expenses - List expenses with optional filters
router.get('/', (req, res) => {
  let result = expenses;
  const { userId, categories, from, to } = req.query;

  if (userId) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (categories) {
    const filterCategories = Array.isArray(categories)
      ? categories
      : [categories];

    result = result.filter((e) => filterCategories.includes(e.category));
  }

  if (from) {
    result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  res.status(200).json(result);
});

// POST /expenses - Create a new expense
router.post('/', (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const userExists = users.find((u) => u.id === userId);

  if (!userExists) {
    return res.status(400).json({ error: 'User not found' });
  }

  const newExpense = {
    id: nextExpenseId++,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// GET /expenses/:id - Get an expense by ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.status(200).json(expense);
});

// PATCH /expenses/:id - Update expense fields
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  const allowedFields = ['spentAt', 'title', 'amount', 'category', 'note'];
  const hasValidFields = allowedFields.some((field) => field in req.body);

  if (!hasValidFields) {
    return res.status(400).json({ error: 'No valid fields provided' });
  }

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      expense[field] = req.body[field];
    }
  }

  res.status(200).json(expense);
});

// DELETE /expenses/:id - Delete expense
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  expenses.splice(index, 1);
  res.sendStatus(204);
});

module.exports = router;
