'use strict';

const express = require('express');
const users = require('../services/users.service');
const expenses = require('../services/expenses.service');

const router = express.Router();

router.param('id', (req, res, next, id) => {
  const num = parseInt(id);

  if (isNaN(num)) {
    res.status(400).send({ error: 'Invalid ID format' });
  } else {
    req.params.id = num;
    next();
  }
});

router.get('/', (req, res) => {
  const { query } = req;
  const expensesFromServer = expenses.getExpenses();

  if (!Object.keys(query).length) {
    res.send(expensesFromServer);

    return;
  }

  const expensesByQuery = expenses.getExpenseByQuery(query);

  res.send(expensesByQuery);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const expense = expenses.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
});

router.post('/', express.json(), (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isUserExist = users.getUserById(userId);
  const allValuesExist = userId
    && spentAt
    && title
    && amount
    && category
    && note
    && isUserExist;

  if (!allValuesExist) {
    res.sendStatus(400);

    return;
  }

  const expense = expenses.createExpense(req.body);

  res.status(201).send(expense);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expenses.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenses.deleteExpense(id);

  res.sendStatus(204);
});

router.patch('/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const expense = expenses.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newData = expenses.updateExpense(expense, req.body);

  newData ? res.send(newData) : res.sendStatus(422);
});

module.exports = {
  router,
};
