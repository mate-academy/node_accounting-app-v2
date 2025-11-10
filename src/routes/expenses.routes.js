'use strict';

const express = require('express');

const {
  getExpensesById,
  patchExpensesById,
  deleteExpensesById,
} = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', (req, res) => {
  const expenses = req.app.locals.expenses;
  const { userId, from, to, categories } = req.query;
  let result = expenses;

  if (userId) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (from && to) {
    result = result.filter(
      (e) =>
        new Date(e.spentAt) >= new Date(from) &&
        new Date(e.spentAt) <= new Date(to),
    );
  }

  if (categories) {
    const cats = categories.split(',');

    result = result.filter((e) => cats.includes(e.category));
  }

  res.json(result);
});

router.post('/', (req, res) => {
  const users = req.app.locals.users;
  const expenses = req.app.locals.expenses;
  const nextExpenseId = req.app.locals.nextExpenseId;

  const { userId, title, amount, category, spentAt, note } = req.body;
  const userExists = users.some((u) => u.id === userId);

  if (!userExists) {
    return res.status(400).send('User not found');
  }

  const expense = {
    id: nextExpenseId(),
    userId,
    title,
    amount,
    category,
    spentAt,
    note,
  };

  expenses.push(expense);
  res.status(201).json(expense);
});

router.get('/:id', getExpensesById);
router.patch('/:id', patchExpensesById);
router.delete('/:id', deleteExpensesById);

module.exports = router;
