'use strict';

const express = require('express');
const router = express.Router();
const { users } = require('./users');

let expenses = [];

router.get('/', (req, res) => {
  const { userId, from, to, categories } = req.query;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = expenses.filter(expense => expense.userId === +userId);
  };

  if (categories) {
    filteredExpenses = expenses.filter(expense =>
      categories.includes(expense.categories));
  }

  if (from) {
    filteredExpenses = expenses.filter(expense =>
      new Date(from) <= new Date(expense.spentAt));
  }

  if (to) {
    filteredExpenses = expenses.filter(expense =>
      new Date(to) >= new Date(expense.spentAt));
  }

  res.json(filteredExpenses);
});

router.get('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  if (!foundExpense) {
    res.status(404);
    res.send('Expense not found');

    return;
  }

  res.json(foundExpense);
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

  const foundUser = users.find(user => user.id === +userId);

  if (!foundUser) {
    res.status(400);
    res.send('Expense is not added');

    return;
  }

  const newExpense = {
    id: Math.floor(Math.random() * 100 + 1),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  res.status(201);
  res.json(newExpense);
});

router.delete('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const filteredExpenses = expenses.filter(expense =>
    expense.id !== +expenseId);

  if (filteredExpenses.length === expenses.length) {
    res.status(404);
    res.send('Expense for deleting is not found');

    return;
  }

  expenses = filteredExpenses;

  res.sendStatus(204);
});

router.patch('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  if (!foundExpense) {
    res.status(404);
    res.send('User for updating not found');

    return;
  }

  const updatedExpense = {
    ...foundExpense,
    ...req.body,
  };

  Object.assign(foundExpense, updatedExpense);

  res.json(foundExpense);
});

module.exports = {
  router,
  expenses,
};
