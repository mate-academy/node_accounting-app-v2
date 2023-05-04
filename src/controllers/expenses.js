'use strict';

const {
  getAllExpenses,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../services/exprensesService');

function getAllExpensesAction(req, res) {
  const expenses = getAllExpenses();

  res.send(expenses);
};

function addExpenseAction(req, res) {
  const expense = req.body;
  const listPlaces = ['title', 'amount', 'category', 'note'];
  const keysExpense = Object.keys(expense);
  const { userId } = req.body;

  const missingFields = listPlaces
    .filter(field => !keysExpense.includes(field));

  if (missingFields.length
    || !getAllExpenses().filter((el) => el.userId === userId).length) {
    res.sendStatus(400);

    return;
  }

  addExpense(expense);

  res.sendStatus(201);
};

function getExpenseAction(req, res) {
  const { expenseId } = req.params;

  if (!getAllExpenses().filter((el) => el.id === expenseId).length) {
    res.sendStatus(404);

    return;
  }

  res.send(getExpense(expenseId));
};

function deleteExpenseAction(req, res) {
  const { expenseId } = req.params;

  if (!getAllExpenses().filter((el) => el.id === expenseId).length) {
    res.sendStatus(404);

    return;
  }

  deleteExpense(expenseId);

  res.sendStatus(204);
};

function checkObjectProps(obj, arr) {
  const keys = Object.keys(obj);

  return keys.some(element => !arr.includes(element));
}

function updateExpenseAction(req, res) {
  const { expenseId } = req.params;
  const expense = req.body;
  const listPlaces = ['title', 'amount', 'category', 'note'];

  if (!getAllExpenses().filter((el) => el.id === expenseId).length
      || checkObjectProps(expense, listPlaces)
  ) {
    res.sendStatus(404);

    return;
  }

  updateExpense(expenseId, expense);

  res.sendStatus(200);
}

module.exports = {
  getAllExpensesAction,
  addExpenseAction,
  getExpenseAction,
  deleteExpenseAction,
  updateExpenseAction,
};
