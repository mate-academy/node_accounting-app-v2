'use strict';

const express = require('express');
const expenseService = require('../services/expensesService');
const { getUserById } = require('../services/usersService');
const cors = require('cors');

const router = express.Router();

router.use(cors());

router.get('/', (req, res) => {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const id = Number(userId);

  res.statusCode = 200;

  if (!expenseService.getExpenses().length) {
    res.send([]);

    return;
  }

  if (from && to) {
    const userExpenses = expenseService.filterByTime(from, to);

    res.send(userExpenses);
  }

  const foundUser = getUserById(id);

  if (foundUser) {
    const userExpenses = expenseService
      .findUserExpenses(id, category);

    res.send(userExpenses);

    return;
  }

  res.send(expenseService.getExpenses());
});

router.get('/:expenseId', (req, res) => {
  const expenseId = Number(req.params.expenseId);

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.send(404);

    return;
  }

  res.send(foundExpense);
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

  if (!title) {
    res.sendStatus(400);

    return;
  }

  const foundUser = getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService
    .createNewExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

  res.statusCode = 201;

  res.send(newExpense);
});

router.patch('/:expenseId', express.json(), (req, res) => {
  const expenseId = Number(req.params.expenseId);
  const { title } = req.body;

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.send(404);

    return;
  }

  expenseService.updateExpense(expenseId, title);

  res.statusCode = 200;

  res.send(foundExpense);
});

router.delete('/:expenseId', (req, res) => {
  const expenseId = Number(req.params.expenseId);

  const expensesLength = expenseService.getExpenses().length;

  const filteredExpenses = expenseService.filterExpensesById(expenseId);

  if (filteredExpenses.length === expensesLength) {
    res.send(404);

    return;
  }

  res.send(204);
});

module.exports = {
  router,
};
