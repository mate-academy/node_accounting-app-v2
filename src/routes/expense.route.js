/* eslint-disable no-console */
'use strict';

const express = require('express');
const {
  getExpenses,
  createExpenses,
  getExpenseById,
  deleteExpense,
  updateExpense,
} = require('../services/expense.service');
const { getById } = require('../services/user.service');
const expensesRouter = express.Router();

expensesRouter.get('/', (req, res) => {
  const expense = getExpenses(req.query);

  res.send(expense);
});

expensesRouter.post('/', (req, res) => {
  const { userId, spentAt, title, amount, category, note, id } = req.body;

  const user = getById(userId);

  if (!user || !title) {
    res.sendStatus(400);

    return;
  }

  const expense = createExpenses(
    userId, spentAt, title, amount, category, note, id
  );

  res.status(201);
  res.send(expense);
});

expensesRouter.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);

    return;
  }

  const expense = getExpenseById(req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
});

expensesRouter.delete('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);

    return;
  }

  const expense = deleteExpense(req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
});

expensesRouter.patch('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);

    return;
  }

  const expense = getExpenseById(req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = updateExpense(
    req.body,
    req.params.id
  );

  res.send(newExpense);
});

module.exports = {
  expensesRouter,
};
