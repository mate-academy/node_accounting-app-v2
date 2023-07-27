'use strict';

const express = require('express');
const router = express.Router();
const { getUsers } = require('./users');

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

router.get('/', (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = expenses.filter(
      expense => expense.userId === Number(userId));
  }

  if (categories) {
    filteredExpenses = expenses.filter(
      expense => categories.includes(expense.category));
  }

  if (from) {
    filteredExpenses = expenses.filter(
      expense => new Date(from) <= new Date(expense.spentAt));
  }

  if (to) {
    filteredExpenses = expenses.filter(
      expense => new Date(to) >= new Date(expense.spentAt));
  }

  res.json(filteredExpenses);
});

router.get('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const requestedExpense = expenses.find(
    expense => expense.id === Number(expenseId));

  if (!requestedExpense) {
    res.status(404);
    res.send('Expense is not exist');

    return;
  }

  res.json(requestedExpense);
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

  if (typeof title !== 'string') {
    res.status(400);
    res.send('title in required');

    return;
  }

  if (!isFinite(Number(userId))) {
    res.status(400);
    res.send('userId in required');

    return;
  }

  const foundUser = getUsers().find(user => user.id === +userId);

  if (!foundUser) {
    res.status(400);
    // res.json(users);
    res.send(`User is not found`);

    return;
  }

  if (!spentAt) {
    res.status(400);
    res.send('spentAt in required');

    return;
  }

  if (spentAt && isNaN(new Date(spentAt))) {
    res.status(400);
    res.send('spentAt must be date');

    return;
  }

  if (typeof amount !== 'number') {
    res.status(400);
    res.send('amount in required');

    return;
  }

  if (note && typeof note !== 'string') {
    res.status(400);
    res.send('note must be a string');

    return;
  }

  if (typeof category !== 'string') {
    res.status(400);
    res.send('category in required');

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

  const filteredExpenses = expenses.filter(
    expense => expense.id !== Number(expenseId));

  if (filteredExpenses.length === expenses.length) {
    res.status(404);
    res.send('Expense is not exist');

    return;
  }

  expenses = filteredExpenses;

  res.sendStatus(204);
});

router.patch('/:expenseId', (req, res) => {
  const { expenseId } = req.params;
  // const {
  //   spentAt,
  //   title,
  //   amount,
  //   category,
  //   note,
  // } = req.body;

  const requestedExpense = expenses.find(
    expense => expense.id === Number(expenseId));

  if (!requestedExpense) {
    res.status(404);
    res.send('Expense is not exist');

    return;
  }

  // if (typeof title !== 'string') {
  //   res.status(400);
  //   res.send('title in required');

  //   return;
  // }

  // if (typeof userId !== 'number') {
  //   res.status(400);
  //   res.send('userId in required');

  //   return;
  // }

  // if (!spentAt) {
  //   res.status(400);
  //   res.send('spentAt in required');

  //   return;
  // }

  // if (isNaN(new Date(spentAt))) {
  //   res.status(400);
  //   res.send('spentAt must be date');

  //   return;
  // }

  // if (typeof amount !== 'number') {
  //   res.status(400);
  //   res.send('amount in required');

  //   return;
  // }

  // if (typeof category !== 'string') {
  //   res.status(400);
  //   res.send('category in required');

  //   return;
  // }

  // if (note && typeof note !== 'string') {
  //   res.status(400);
  //   res.send('note must be a string');

  //   return;
  // }

  const updatedExpense = {
    ...requestedExpense,
    ...req.body,
  };

  Object.assign(requestedExpense, updatedExpense);

  res.json(requestedExpense);
});

module.exports = {
  router,
  expenses,
  resetExpenses,
};
