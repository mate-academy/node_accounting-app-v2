'use strict';

const express = require('express');
const router = express.Router();

let expenses = [
  {
    id: 1,
    userId: 2,
    spentAt: '2023-07-21T11:47:09.739Z',
    title: 'testTitle1',
    amount: 30,
    category: 'testCategory',
    note: 'testNote',
  },
  {
    id: 2,
    userId: 3,
    spentAt: '2024-02-22T11:41:03.734Z',
    title: 'testTitle2',
    amount: 40,
    category: 'testCategory2',
    note: 'testNote2',
  },

];

router.get('/', (req, res) => {
  const { userId, categories, from, to } = req.query;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = expenses.filter(exp => exp.userId === +userId);
  };

  if (categories) {
    filteredExpenses = expenses
      .filter(exp => categories.includes(exp.categories));
  }

  if (from) {
    filteredExpenses = expenses
      .filter(exp => new Date(from) <= new Date(exp.spentAt));
  }

  if (to) {
    filteredExpenses = expenses
      .filter(exp => new Date(to) >= new Date(exp.spentAt));
  }

  res.send(filteredExpenses);
});

router.post('/', (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const newExpenseId = expenses.length + 1;

  const newExp = {
    id: newExpenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  if (!userId || !spentAt || !title || !category || !amount || !note) {
    res.sendStatus(400);

    return;
  }

  expenses.push(newExp);
  res.sendStatus(201);
});

router.get('/:expenseId', (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(foundExpense);
});

router.delete('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const newExpenses = expenses.filter(expense => expense.id !== +expenseId);

  if (newExpenses.length === expenses.length) {
    res.sendStatus(404);

    return;
  }

  expenses = newExpenses;

  res.sendStatus(204);
});

router.patch('/:expenseId', (req, res) => {
  const { expenseId } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const foundExp = expenses.find(expense => expense.id === +expenseId);

  if (!foundExp) {
    res.sendStatus(404);

    return;
  }

  Object.assign(foundExp, {
    spentAt, title, amount, category, note,
  });

  res.send(foundExp);
});

module.exports = { router };
