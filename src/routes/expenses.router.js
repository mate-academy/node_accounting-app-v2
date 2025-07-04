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
    res.status(400).send({ message: 'Expense ID is required' });

    return;
  }

  const expense = getExpense(expenseId);

  if (!expense) {
    res.status(404).send({ message: 'Expense not found' });

    return;
  }

  res.status(200).send(expense);
});

expensesRouter.post('/', (req, res) => {
  const { userId, title, amount } = req.body;

  if (
    !userId ||
    !title ||
    typeof amount === 'undefined' ||
    amount === null ||
    isNaN(Number(amount))
  ) {
    res.status(400).send({ message: 'Required fields: userId, title, amount' });

    return;
  }

  const expense = addExpense(req.body);

  if (!expense) {
    res.status(400).send({ message: 'User not found' });

    return;
  }

  res.status(201).send(expense);
});

expensesRouter.delete('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.status(400).send({ message: 'Expense ID is required' });

    return;
  }

  const removed = removeExpense(expenseId);

  if (!removed) {
    res.status(404).send({ message: 'Expense not found' });

    return;
  }

  res.sendStatus(204);
});

expensesRouter.patch('/:expenseId', (req, res) => {
  const { expenseId } = req.params;
  const { body } = req;

  const expense = changeExpense(expenseId, body);

  if (expense === -1) {
    res.status(404).send({ message: 'Expense not found' });

    return;
  }

  if (expense === false) {
    res.status(400).send({ message: 'Request body cannot be empty' });

    return;
  }

  res.status(200).send(expense);
});

module.exports = {
  expensesRouter,
};
