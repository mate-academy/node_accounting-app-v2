'use strict';

const express = require('express');
const router = express.Router();
const expensesService = require('../services/expenses');
const userService = require('../services/user');

router.use(express.json());

router.get('/', (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  const expenses = expensesService.getExpenses(userId, categories, from, to);

  res.json(expenses);
});

router.post('/', (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!(
    userId !== undefined
    && userService.getUserById(userId.toString())
    && spentAt !== undefined
    && title !== undefined
    && amount !== undefined
    && category !== undefined
  )) {
    res.sendStatus(400);

    return;
  }

  const createdExpense = expensesService.addExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201);
  res.json(createdExpense);
});

router.get('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.json(foundExpense);
});

router.delete('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpenseById(expenseId);

  res.sendStatus(204);
});

router.patch('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const allowedKeys = [
    'spentAt',
    'title',
    'amount',
    'category',
    'note',
  ];

  const changes = {};

  for (const key of allowedKeys) {
    if (req.body[key] !== undefined) {
      changes[key] = req.body[key];
    }
  }

  if (Object.keys(changes).length === 0) {
    res.sendStatus(400);

    return;
  }

  const updated = expensesService.patchExpense(foundExpense, changes);

  res.json(updated);
});

module.exports = router;
