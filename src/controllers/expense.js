'use strict';

const {
  getAllExpenses,
  getExpense,
  deleteExpense,
  createNewExpense,
  updateExpense,
} = require('../services/expenses');

const getAllExpensesController = (req, res) => {
  const findExpenses = getAllExpenses(req.query);

  res.send(findExpenses);
};

const getExpenseController = (req, res) => {
  const { expenseId } = req.params;

  const result = getExpense(expenseId);

  if (!result) {
    res.sendStatus(404);

    return;
  }

  res.send(result);
};

const deleteExpenseController = (req, res) => {
  const { expenseId } = req.params;

  const wasRemoved = deleteExpense(expenseId);

  if (!wasRemoved) {
    res.sendStatus(404);
  }

  res.sendStatus(204);
};

const createNewExpenseController = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = createNewExpense(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const updateExpenseController = (req, res) => {
  const { expenseId } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  if (!expenseId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const wasUpdated = updateExpense(expenseId, req.body);

  if (!wasUpdated) {
    res.sendStatus(404);

    return;
  }

  res.send(wasUpdated);
};

module.exports = {
  getAllExpensesController,
  getExpenseController,
  deleteExpenseController,
  createNewExpenseController,
  updateExpenseController,
};
