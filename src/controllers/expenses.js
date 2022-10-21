'use strict';

const { postExpense,
  getExpenseById,
  getExpenses,
  deleteExpense,
  updateExpense } = require('../services/expenses');
const { getUserById } = require('../services/users');
const { allUsers } = require('../controllers/users');
let expenses = [];

const expensesArray = () => {
  expenses = [];
};
const controllerPostExpense = (req, res) => {
  const { userId } = req.body;

  const user = getUserById(+userId, allUsers());
  const expense = postExpense(req.body, expenses);

  if (user === null) {
    // console.log(user);
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(expense);
};

const controllerGetExpenses = (req, res) => {
  const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

  const copy = getExpenses(normalizedURL, expenses);

  res.statusCode = 200;

  if (normalizedURL.search) {
    res.send(copy);
  } else {
    res.send(expenses);
  }
};

const controllerGetExpenseById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = getExpenseById(+expenseId, expenses);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const controllerDeleteExpense = (req, res) => {
  const { expenseId } = req.params;
  const newExpenses = deleteExpense(expenseId, expenses);

  if (expenses.length === newExpenses.length) {
    res.sendStatus(404);

    return;
  }

  expenses = newExpenses;

  res.sendStatus(204);
};

const controllerPatchExpense = (req, res) => {
  const { expenseId } = req.params;
  const { title } = req.body;

  const foundExpense = getExpenseById(expenseId, expenses);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!title) {
    res.sendStatus(400);

    return;
  }

  updateExpense(foundExpense, title);
  res.send(foundExpense);
};

module.exports = {
  controllerPostExpense,
  controllerGetExpenses,
  controllerGetExpenseById,
  controllerDeleteExpense,
  controllerPatchExpense,
  expensesArray,
};
