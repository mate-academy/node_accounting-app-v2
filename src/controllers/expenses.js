'use strict';

const {
  getAllExpenses,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../services/exprensesService');
const { getAllUsers } = require('../services/usersServer.js');

function getAllExpensesAction(req, res) {
  const expenses = getAllExpenses();

  res.json(expenses);
};

function addExpenseAction(req, res) {
  const expense = req.body;
  const allowedKeys = [
    'title',
    'mount',
    'category',
    'note',
    'spentAt',
    'userId',
  ];
  const keysExpense = Object.keys(expense);

  const missingFields = keysExpense.every(key => allowedKeys.includes(key));

  if (
    !getAllUsers().length
    || !getAllUsers().filter((el) => el.id === expense.userId).length
    || !missingFields) {
    res.sendStatus(400);

    return;
  }

  const newExpense = addExpense(expense);

  res.json(newExpense);
  res.status(201);
};

function getExpenseAction(req, res) {
  const { id } = req.params;

  if (!getAllExpenses().filter((el) => el.userId === id).length) {
    res.sendStatus(404);

    return;
  }

  res.json(getExpense(id));
};

function deleteExpenseAction(req, res) {
  const { id } = req.params;

  if (!getAllExpenses().filter((el) => el.id === id).length) {
    res.sendStatus(404);

    return;
  }

  deleteExpense(id);

  res.sendStatus(204);
};

function updateExpenseAction(req, res) {
  const { id } = req.params;
  const expense = req.body;
  const allowedKeys = [
    'title',
    'mount',
    'category',
    'note',
    'spentAt',
    'userId',
  ];
  const keysExpense = Object.keys(expense);

  const missingFields = keysExpense.every(key => allowedKeys.includes(key));

  if (!missingFields) {
    res.sendStatus(400);

    return;
  }

  if (!getAllExpenses().filter((el) => el.userId === id).length) {
    res.sendStatus(404);

    return;
  }

  updateExpense(id, expense);

  res.sendStatus(200);
}

module.exports = {
  getAllExpensesAction,
  addExpenseAction,
  getExpenseAction,
  deleteExpenseAction,
  updateExpenseAction,
};
