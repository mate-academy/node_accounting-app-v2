'use strict';

const express = require('express');
const router = express.Router();
const { users } = require('./users');

let expenses = [];

router.get('/', (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  if (userId) {
    expenses = expenses.filter(expense => (
      expense.userId === Number(userId)));
  }

  if (categories) {
    expenses = expenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from) {
    expenses = expenses.filter(expense => (
      expense.spentAt >= from
    ));
  }

  if (to) {
    expenses = expenses.filter(expense => (
      expense.spentAt <= to
    ));
  }

  if (from && to) {
    expenses = expenses.filter(expense => (
      expense.spentAt >= from && expense.spentAt <= to
    ));
  }

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

  const findUser = users.find(user => user.id === Number(userId));

  if (!findUser) {
    res.status(400);
    res.send('Expense is not added');

    return;
  }

  const newExpense = {
    id: Math.floor(Math.random() * 100),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  res.statusCode = 201;
  res.json(newExpense);
});

router.get('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const findExpense = expenses.find(expense => (
    expense.id === Number(expenseId)));

  if (!findExpense) {
    res.status(404);
    res.send('Expense not found');

    return;
  }

  res.json(findExpense);
});

router.patch('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const findExpense = expenses.find(expense => (
    expense.id === Number(expenseId)));

  if (!findExpense) {
    res.status(404);
    res.send('Expense for updating not found');

    return;
  }

  const updatedExpense = {
    ...findExpense,
    ...req.body,
  };

  Object.assign(findExpense, updatedExpense);

  res.json(findExpense);
});

router.delete('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const filteredExpenses = expenses.filter(expense => (
    expense.id !== Number(expenseId)));

  if (filteredExpenses.length === expenses.length) {
    res.status(404);
    res.send('Expense for deleting is not found');

    return;
  }

  expenses = filteredExpenses;

  res.sendStatus(204);
});

module.exports = {
  router,
  users,
  expenses,
};
