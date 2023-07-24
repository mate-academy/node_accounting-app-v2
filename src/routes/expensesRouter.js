'use strict';

const express = require('express');
const { getUserById } = require('../services/userServices');
const expensesRouter = express.Router();

const validateData = (request) => {
  const requiredFields
  = ['userId', 'spentAt', 'title', 'amount', 'category'];

  const requestFields = Object.keys(request);

  const hasRequiredFields
    = requiredFields
      .every(field => requestFields.includes(field));

  const user = getUserById(request.userId);

  if (!user || !hasRequiredFields || !requiredFields.length) {
    return false;
  }

  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = request;

  if (
    typeof userId !== 'number'
    || typeof amount !== 'number'
    || typeof title !== 'string'
    || typeof category !== 'string'
    || isNaN(Date.parse(spentAt))
  ) {
    return false;
  }

  return true;
};

let expenses = [];

const init = () => {
  expenses = [];
};

expensesRouter.get('/', (req, res) => {
  const {
    userId, categories, from, to,
  } = req.query;

  expenses = expenses.filter(expense => {
    const userIdMatch = userId
      ? +expense.userId === +userId
      : true;

    const categoryMatch = categories
      ? categories.includes(expense.category)
      : true;

    const datesMatch = (from && to)
      ? expense.spentAt >= from && expense.spentAt <= to
      : true;

    return userIdMatch && categoryMatch && datesMatch;
  });

  res.send(expenses);
});

expensesRouter.post('/', (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isValidRequest = validateData(req.body);

  if (!isValidRequest) {
    res.status(400).send({ message: 'Validation error' });

    return;
  }

  const maxId = expenses.length > 0
    ? Math.max(...expenses.map(({ id }) => id))
    : 0;

  const newExpense = {
    id: maxId + 1,
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

expensesRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundExpense = expenses.find(expense => String(expense.id) === id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
});

expensesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  const existingExpense = expenses.find(expense => String(expense.id) === id);

  if (!existingExpense) {
    res.sendStatus(404);

    return;
  }

  expenses = expenses.filter((expense) => String(expense.id) !== id);

  res.statusCode = 204;
  res.send(expenses);
});

expensesRouter.patch('/:id', (req, res) => {
  const { id } = req.params;

  const existingExpense = expenses.find(expense => +expense.id === +id);

  if (!existingExpense) {
    res
      .status(404)
      .send({ message: 'Expense not found' });

    return;
  }

  Object.assign(existingExpense, { ...req.body });

  res.send(existingExpense);
});

module.exports = {
  expensesRouter,
  init,
};
