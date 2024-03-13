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
const {
  BAD_REQUEST,
  NOT_FOUND,
  NO_CONTENT,
  CREATED,
} = require('../variables');
const expensesRouter = express.Router();

expensesRouter.get('/', (req, res) => {
  const expense = getExpenses(req.query);

  res.send(expense);
});

expensesRouter.post('/', (req, res) => {
  const { userId, spentAt, title, amount, category, note, id } = req.body;

  const user = getById(userId);

  if (!user || !title) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const expense = createExpenses(
    userId, spentAt, title, amount, category, note, id
  );

  res.status(CREATED);
  res.send(expense);
});

expensesRouter.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const expense = getExpenseById(req.params.id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(expense);
});

expensesRouter.delete('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const expense = deleteExpense(req.params.id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.sendStatus(NO_CONTENT);
});

expensesRouter.patch('/:id', (req, res) => {
  if (!req.params.id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const expense = getExpenseById(req.params.id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

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
