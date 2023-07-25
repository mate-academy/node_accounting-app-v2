'use strict';

const express = require('express');
const router = express.Router();
const { users } = require('./users.router.js');
const { getNewId } = require('../helpers.js');

let expenses = [];

router.get('/', (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = expenses.filter(expense => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= fromDate && spentAt <= toDate;
    });
  }

  if (categories) {
    filteredExpenses = expenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  res.send(filteredExpenses);
});

router.get('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenses.find(expense => (
    expense.id === Number(expenseId)));

  if (!foundExpense) {
    res.status(404).send('Expense not found');

    return;
  }

  res.send(foundExpense);
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

  if (!userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note) {
    res.status(422).send('All input fields are required');

    return;
  }

  if (
    typeof userId !== 'number'
    || isNaN(Date.parse(spentAt))
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string') {
    res.status(422).send('Incorrect Data Format');

    return;
  }

  const foundUser = users.find(user => Number(user.id) === Number(userId));

  if (!foundUser) {
    res.status(400).send(`Unable to add an expense to userId ${userId}`);

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
  res.status(201).send(newExpense);
});

router.delete('/:expenseId', (req, res) => {
  const { expenseId } = req.params;
  const filteredExpenses = expenses.filter(expense => (
    expense.id !== Number(expenseId)
  ));

  if (filteredExpenses.length === expenses.length) {
    res.status(404).send(`Unable to delete expense with id ${expenseId}`);

    return;
  }

  expenses = filteredExpenses;
  res.sendStatus(204);
});

router.patch('/:expenseId', (req, res) => {
  const { expenseId } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;
  const findExpense = expenses.find(expense => (
    expense.id === Number(expenseId)));

  if (!findExpense) {
    res.status(404).send(`Unable to update expense with id: ${expenseId}`);

    return;
  }

  if (isNaN(Date.parse(spentAt))
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
    || req.body.length === 0
    || req.body.length > 5) {
    res.status(422).send('Incorrect Data Format');

    return;
  }

  const updatedExpense = {
    ...findExpense,
    ...req.body,
  };

  Object.assign(findExpense, updatedExpense);

  res.send(findExpense);
});

module.exports = { router };
