'use strict';

const expensesModule = require('../services/expenses');
const userModule = require('../services/users');

const getAll = (req, res) => {
  const queryParams = req.query;

  const expenses = expensesModule.getAll(queryParams);

  res.send(expenses);
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesModule.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const createExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;

  const foundUser = userModule.getUserById(userId);

  const isDataInvalid = !foundUser
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string';

  if (isDataInvalid) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesModule.createExpense(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesModule.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesModule.deleteExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const { title } = req.body;

  const foundExpense = expensesModule.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  Object.assign(foundExpense, { title });

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
