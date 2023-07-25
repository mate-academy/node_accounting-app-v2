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

  res.send(expenses);
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
    res.sendStatus(400);

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
  res.send(newExpense);
});

router.get('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const findExpense = expenses.find(expense => (
    expense.id === Number(expenseId)
  ));

  if (!findExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(findExpense);
});

router.patch('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const findExpense = expenses.find(expense => (
    expense.id === Number(expenseId)
  ));

  if (!findExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = {
    ...findExpense,
    ...req.body,
  };

  Object.assign(findExpense, updatedExpense);

  res.send(findExpense);
});

router.delete('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const filteredExpenses = expenses.filter(expense => (
    expense.id !== Number(expenseId)
  ));

  if (filteredExpenses.length === expenses.length) {
    res.sendStatus(404);

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
