'use strict';

const express = require('express');
const router = express.Router();
const { getNewId } = require('../helpers');
const { users } = require('./users');

let expenses = [];

router.post('/', (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!title) {
    res.status(400).json({
      error: 'Name is not provided!',
    });

    return;
  }

  const foundUser = users.find(user => user.id === +userId);

  if (!foundUser) {
    res.status(400).json({
      error: 'User not found!',
    });

    return;
  }

  const newExpense = {
    id: getNewId(expenses),
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

router.get('/', (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(expense => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= fromDate && spentAt <= toDate;
    });
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  res.json(filteredExpenses);
});

router.get('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenses
    .find(expense => expense.id === +expenseId);

  if (!foundExpense) {
    res.status(404).json({
      error: 'Expense not found!',
    });

    return;
  }

  res.json(foundExpense);
});

router.patch('/:expenseId', (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenses
    .find(expense => expense.id === +expenseId);

  if (!foundExpense) {
    res.status(404).json({
      error: 'Expense not found!',
    });

    return;
  }

  Object.assign(foundExpense, req.body);
  res.json(foundExpense);
});

router.delete('/:expenseId', (req, res) => {
  const { expenseId } = req.params;
  const foundExpenseIndex = expenses
    .findIndex(expense => expense.id === +expenseId);

  if (foundExpenseIndex === -1) {
    res.status(404).json({
      error: 'Expense not found!',
    });

    return;
  }

  expenses.splice(foundExpenseIndex, 1);
  res.sendStatus(204);
});

module.exports = {
  expenses,
  router,
};
