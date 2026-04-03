'use strict';

const express = require('express');
const { expenses } = require('../models/expenses');
const { users } = require('../models/users');

const router = express.Router();

// eslint-disable-next-line max-len
// Returns the next available integer ID for a collection by finding the maximum key and adding 1
// We use this to generate a new ID for a new expense
function getNextId(collection) {
  return (
    Object.keys(collection).reduce((maxId, key) => {
      return Math.max(maxId, Number(key));
    }, 0) + 1
  );
}

function parseCategories(categories) {
  if (!categories) {
    return [];
  }

  const values = Array.isArray(categories) ? categories : [categories];

  return values
    .flatMap((value) => String(value).split(','))
    .map((value) => value.trim())
    .filter(Boolean);
}

router.get('/', (req, res) => {
  const { userId, from, to, categories } = req.query;
  const fromTime = from ? new Date(from).getTime() : null;
  const toTime = to ? new Date(to).getTime() : null;
  const categoryList = parseCategories(categories);

  const filteredExpenses = Object.values(expenses).filter((expense) => {
    if (userId !== undefined && String(expense.userId) !== String(userId)) {
      return false;
    }

    const spentAtTime = new Date(expense.spentAt).getTime();

    if (fromTime !== null && spentAtTime < fromTime) {
      return false;
    }

    if (toTime !== null && spentAtTime > toTime) {
      return false;
    }

    if (categoryList.length > 0 && !categoryList.includes(expense.category)) {
      return false;
    }

    return true;
  });

  res.status(200).json(filteredExpenses);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const expense = expenses[id];

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  res.status(200).json(expense);
});

router.post('/', (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined ||
    category === undefined
  ) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  if (!users[userId]) {
    return res.status(400).json({ error: 'User not found' });
  }

  const id = getNextId(expenses);

  const expense = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
  };

  if (note !== undefined) {
    expense.note = note;
  }

  expenses[id] = expense;
  res.status(201).json(expense);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { userId, spentAt, title, amount, category, note } = req.body;
  const expense = expenses[id];

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  if (userId !== undefined) {
    if (!users[userId]) {
      return res.status(400).json({ error: 'User not found' });
    }

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
  res.status(200).json(expense);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const expense = expenses[id];

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  delete expenses[id];
  res.status(204).send();
});

module.exports = router;
