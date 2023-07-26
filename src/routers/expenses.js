'use strict';

const express = require('express');
const router = express.Router();
const { getUserById } = require('./users');
const { getNewId } = require('../helpers');

let expenses = [];

function setInitialExpenses() {
  expenses = [];
}

router.get('/', (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  const filteredExpenses = expenses.filter(expense => {
    const rightUsers = userId
      ? expense.userId === Number(userId)
      : true;
    const rightCategories = categories
      ? categories.includes(expense.category)
      : true;
    const rightSpentAt = (from && to)
      ? expense.spentAt >= from && expense.spentAt <= to
      : true;

    return rightUsers && rightCategories && rightSpentAt;
  });

  res.status(200);
  res.json(filteredExpenses);
});

router.get('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const expenseIdById = expenses.find(expense =>
    Number(expenseId) === expense.id
  );

  if (!expenseIdById) {
    res.status(404).send({ message: 'Expected entity doesn/t exist.' });

    return;
  }

  res.status(200);
  res.json(expenseIdById);
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

  const userById = getUserById(userId);

  if (!userById) {
    res.status(400).send({ message: 'Required parameter is not passed' });

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

  res.status(201);
  res.json(newExpense);
});

router.delete('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const foudExpense = expenses.find(expense =>
    expense.id === Number(expenseId));

  if (!foudExpense) {
    res.status(404).send({ message: 'Expected entity doesn/t exist.' });

    return;
  }

  const filteredExpenses = expenses.filter(expense =>
    expense.id !== Number(expenseId));

  expenses = filteredExpenses;

  res.sendStatus(204);
});

router.patch('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const expenseById = expenses.find(expense =>
    expense.id === Number(expenseId)
  );

  if (!expenseById) {
    res.status(404).send({ message: 'Expected entity doesn/t exist.' });

    return;
  }

  const updatedExpense = {
    ...expenseById,
    ...req.body,
  };

  Object.assign(expenseById, updatedExpense);

  res.json(expenseById);
});

module.exports = {
  setInitialExpenses,
  router,
  expenses,
};
