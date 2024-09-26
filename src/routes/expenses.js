'use strict';

const express = require('express');
const router = express.Router();
const { users } = require('./users.js');

let expenses = [];

const setInitialExpenses = () => {
  expenses = [];
}

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
      .filter(expense => expense.userId === +userId);
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = expenses.filter(expense => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= fromDate && spentAt <= toDate;
    });
  }

  if (userId && categories) {
    filteredExpenses = expenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  res.send(filteredExpenses);
});

router.post('/', express.json(), (req, res) => {
  const {
    userId,
    amount,
    title,
    spentAt,
    category,
    note,
  } = req.body;

  const foundUser = users.find(user => user.id === +userId);

  if (!foundUser) {
    res.statusCode = 400;
    res.send('Error... user is not found@');

    return;
  }

  const newExpense = {
    id: expenses.length + 1,
    spentAt,
    title,
    amount,
    category,
    note,
    userId,
  };

  expenses.push(newExpense);
  res.statusCode = 201;
  res.send(newExpense);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundExpense = expenses.find(expense => expense.id === +id);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Error... User not found!')

    return;
  }

  res.send(foundExpense);
});

router.patch('/:id', express.json(), (req, res) => {
  const { id } = req.params;

  const foundExpense = expenses.find(expense => expense.id === +id);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Error... expense is not found!')

    return;
  }

  const updatedExpense = {
    ...foundExpense,
    ...req.body,
  };

  Object.assign(foundExpense, updatedExpense);

  res.send(foundExpense);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const foundExpense = expenses.find(expense => expense.id !== +id);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Error... expense is not found!')

    return;
  }

  expenses = expenses.filter(expense => expense.id !== +id);

  res.sendStatus(204);
});

module.exports = { router, setInitialExpenses };
