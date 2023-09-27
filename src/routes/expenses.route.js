'use strict';

const express = require('express');
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

router.get('/', (_, res) => {
  const expensesFromServer = expenses.getExpenses();

  if (!expensesFromServer.length) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesFromServer);
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
  const expense = req.body;

  if (!expenses.hasRequiredProps(expense, res)) {
    return;
  }

  expenses.createExpense(expense);

  res.sendStatus(201);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const expense = expenses.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenses.removeExpense(id);

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
