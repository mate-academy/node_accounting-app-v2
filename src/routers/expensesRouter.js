/* eslint-disable no-console */
/* eslint-disable max-len */
'use strict';

const express = require('express');

const router = express.Router();

// const expense2 = {
//   id: 0,
//   userId: 0,
//   spentAt: Date.now(),
//   title: '',
//   amount: 0,
//   category: '',
//   note: '',
// };

let expenses = [];

let id = 0;

const getExpenses = (userId, categories, from, to) => {
  let findExpenses = expenses;

  if (userId != null) {
    findExpenses = findExpenses.filter(expense => expense.userId === userId);
  }

  if (categories) {
    findExpenses = findExpenses.filter(expense => categories.includes(expense.category));
  }

  if (from) {
    findExpenses = findExpenses.filter(expense => expense.spentAt.getTime() > from.getTime());
  }

  if (to) {
    findExpenses = findExpenses.filter(expense => expense.spentAt.getTime() < to.getTime());
  }

  return findExpenses;
};

router.get('/', (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.body;

  if (userId == null && !categories && !from && !to) {
    res.send(expenses);

    return;
  }

  const foundExpenses = getExpenses(userId, categories, from, to);

  res.send(foundExpenses);
});

router.get('/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400);
    res.send();

    return;
  }

  const foundExpenses = expenses.find(expense => expense.id === parseInt(req.params.id));

  if (!foundExpenses) {
    res.status(404);
    res.send();

    return;
  }

  res.send(foundExpenses);
});

router.post('/', (req, res) => {
  const {
    userId,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!title || !category || !note || userId === null || amount === null) {
    res.status(400);
    res.send();

    return;
  }

  const spentAt = req.body.spentAt || new Date();

  const newExpense = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  id++;

  res.status(201);
  res.send(newExpense);
});

router.delete('/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400);
    res.send();

    return;
  }

  const foundExpenses = expenses.find(expense => expense.id === parseInt(req.params.id));

  if (!foundExpenses) {
    res.status(404);
    res.send();

    return;
  }

  expenses = expenses.filter(expense => expense !== foundExpenses);

  res.status(204);
  res.send(foundExpenses);
});

router.patch('/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400);
    res.send();

    return;
  }

  const foundExpenses = expenses.findIndex(expense => expense.id === parseInt(req.params.id));

  if (foundExpenses < 0) {
    res.status(404);
    res.send();

    return;
  }

  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!spentAt && !title && amount == null && !category && !note) {
    res.status(400);
    res.send();

    return;
  }

  if (spentAt) {
    expenses[foundExpenses].spentAt = spentAt;
  }

  if (title) {
    expenses[foundExpenses].spentAt = title;
  }

  if (amount) {
    expenses[foundExpenses].spentAt = amount;
  }

  if (category) {
    expenses[foundExpenses].spentAt = category;
  }

  if (note) {
    expenses[foundExpenses].spentAt = note;
  }

  res.send(expenses[foundExpenses]);
});

module.exports = router;
