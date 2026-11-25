const express = require('express');
const { expenses, users, getNextExpenseId } = require('../data/store');

const router = express.Router();

// GET all expenses
router.get('/', (req, res) => {
  let result = [...expenses];
  const { userId, categories, from, to } = req.query;

  if (userId) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (categories) {
    result = result.filter((e) => categories.split(',').includes(e.category));
  }

  if (from) {
    result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  res.json(result);
});

// GET expense by ID
router.get('/:id', (req, res) => {
  const expense = expenses.find((e) => e.id === Number(req.params.id));

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.json(expense);
});

// CREATE new expense
router.post('/', (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.status(400).json({ message: 'Required field missing' });
  }

  const userExists = users.find((u) => u.id === Number(userId));

  if (!userExists) {
    return res.status(400).json({ message: 'User not found' });
  }

  const newExpense = {
    id: getNextExpenseId(),
    userId: Number(userId),
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// UPDATE expense
router.patch('/:id', (req, res) => {
  const expense = expenses.find((e) => e.id === Number(req.params.id));

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

  res.json(expense);
});

// DELETE expense
router.delete('/:id', (req, res) => {
  const index = expenses.findIndex((e) => e.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  expenses.splice(index, 1);
  res.sendStatus(204);
});

module.exports = router;
