/* eslint-disable no-shadow */
'use strict';

const express = require('express');

const {
  getAllExpenses,
  getExpenseById,
  updateExpenses,
  removeExpenses,
  createNewExpense,
  initExpenses,
} = require('../services/expenses');

const { getUserById } = require('../services/users');

const router = express.Router();

function createExpense(app) {
  app.use('/expenses', router);

  initExpenses();

  router.post('/', express.json(), (req, res) => {
    const expenseData = req.body;
    const { userId } = expenseData;

    const foundUser = getUserById(userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExtense = createNewExpense(expenseData);

    res.statusCode = 201;
    res.send(newExtense);
  });

  router.get('/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const foundExpens = getExpenseById(expenseId);

    if (!foundExpens) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpens);
  });

  router.get('/', (req, res) => {
    const expenses = getAllExpenses();
    const query = req.query;

    const { userId, category, to, from } = query;

    if (from && to) {
      const foundExpensesByDate = expenses.filter(
        (expense) => expense.spentAt > from && expense.spentAt < to
      );

      res.send(foundExpensesByDate);
      res.statusCode = 200;

      return;
    }

    if (category) {
      const foundExpensesByCategory = expenses.filter(
        (expense) =>
          expense.userId === +query.userId
          && expense.category === query.category
      );

      res.send(foundExpensesByCategory);
      res.statusCode = 200;

      return;
    }

    if (userId) {
      const foundExpensesByUserId = expenses.filter(
        (expense) => expense.userId === +userId
      );

      res.send(foundExpensesByUserId);
      res.statusCode = 200;

      return;
    }

    res.statusCode = 200;
    res.send(expenses);
  });

  router.delete('/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const filteredExpenses = getExpenseById(expenseId);

    if (!filteredExpenses) {
      res.sendStatus(404);

      return;
    }

    removeExpenses(expenseId);
    res.sendStatus(204);
  });

  router.patch('/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpenses = getExpenseById(expenseId);

    if (!foundExpenses) {
      res.sendStatus(404);

      return;
    }

    const { title } = req.body;

    updateExpenses({
      expenseId,
      title,
    });

    res.send(foundExpenses);
    res.statusCode = 200;
  });
}

module.exports = { createExpense };
