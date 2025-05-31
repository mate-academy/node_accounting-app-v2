const express = require('express');
const { Router } = express;
const {
  getAllExpenses,
  getExpense,
  addExpense,
  removeExpense,
  changeExpense,
} = require('../services/expenses.service');

const expensesRouter = Router();

expensesRouter.get('/', (req, res) => {
  const filteredExpenses = getAllExpenses(req.query);

  res.status(200).send(filteredExpenses);
});

expensesRouter.get('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const expense = getExpense(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
});

expensesRouter.post('/', express.json(), (req, res) => {
  const { userId, title, amount } = req.body;

  if (
    !userId ||
    !title ||
    typeof amount === 'undefined' ||
    amount === null ||
    isNaN(Number(amount))
  ) {
    res.sendStatus(400);

    return;
  }

  const expense = addExpense(req.body);

  if (!expense) {
    res.status(400);

    return;
  }

  res.status(201).send(expense);
});

expensesRouter.delete('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const removed = removeExpense(expenseId);

  if (!removed) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
});

expensesRouter.patch('/:expenseId', express.json(), (req, res) => {
  const { expenseId } = req.params;
  const { body } = req;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const expense = changeExpense(expenseId, body);

  if (expense === -1) {
    res.sendStatus(404);

    return;
  }

  if (!expense) {
    res.sendStatus(400);

    return;
  }

  res.status(200).send(expense);
});

module.exports = {
  expensesRouter,
};
