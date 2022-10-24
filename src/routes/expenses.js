'use strict';

const express = require('express');
const expenseServices = require('../services/expenses');
const userServices = require('../services/users');

const expensesRouter = express.Router();

expensesRouter.get('/', (req, res) => {
  const { from, to, category, userId } = req.query;
  const expenses = expenseServices.getExpenses();

  if (category) {
    const searchByCategoties = expenses
      .filter(expense => expense.category === category);

    res.statusCode = 200;
    res.send(searchByCategoties);

    return;
  }

  if (from && to) {
    const searchExpensesByDate = expenses.filter(
      (expense) => new Date(expense.spentAt)
        .getTime() > new Date(from).getTime()
      && new Date(expense.spentAt).getTime() < new Date(to).getTime()
    );

    res.send(searchExpensesByDate);
    res.statusCode = 200;

    return;
  }

  if (userId) {
    const searchByUserId = expenses
      .filter(expense => expense.userId === +userId);

    res.statusCode = 200;
    res.send(searchByUserId);

    return;
  }

  res.statusCode = 200;
  res.send(expenses);
});

expensesRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundExpense = expenseServices.getExpensesById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
});

expensesRouter.post('/', (req, res) => {
  const expense = req.body;

  const { userId } = expense;

  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServices
    .createExpense(expense, userServices.getUsers());

  res.statusCode = 201;
  res.send(newExpense);
});

expensesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  const filteredExpenses = expenseServices.getExpensesById(id);

  if (!filteredExpenses) {
    res.sendStatus(404);

    return;
  }

  expenseServices.removeExpense(id);

  res.sendStatus(204);
});

expensesRouter.patch('/:id', (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  const foundExpense = expenseServices.getExpensesById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);
  }

  expenseServices.updateExpense({
    id,
    title,
  });

  res.statusCode = 200;
  res.send(foundExpense);
});

module.exports = { expensesRouter };
