'use strict';

const {
  postExpense,
  getExpenseById,
  getExpenses,
  deleteExpense,
  updateExpense,
  getExpensesData,
} = require('../services/expenses');
const { getUserById } = require('../services/users');
const { allUsers } = require('../controllers/users');

const controllerPostExpense = (req, res) => {
  const { userId } = req.body;

  const user = getUserById(+userId, allUsers());
  const expense = postExpense(req.body);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(expense);
};

const controllerGetExpenses = (req, res) => {
  const { userId, category, from, to } = req.query;
  const numberFromDate = new Date(from).getTime();
  const numberToDate = new Date(to).getTime();
  const expenses = getExpenses();
  let filtredExpenses = [];

  if (userId) {
    filtredExpenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (category) {
    filtredExpenses = expenses.filter(expense => expense.category === category);
  }

  if (from && to) {
    filtredExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt).getTime();

      return expenseDate < numberToDate && expenseDate > numberFromDate;
    });
  }

  res.statusCode = 200;

  if (Object.keys(req.query).length > 0) {
    res.send(filtredExpenses);
  } else {
    res.send(getExpensesData());
  }
};

const controllerGetExpenseById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const controllerDeleteExpense = (req, res) => {
  const { expenseId } = req.params;
  const expenses = getExpensesData();
  const newExpenses = deleteExpense(expenseId);

  if (expenses.length === newExpenses.length) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const controllerPatchExpense = (req, res) => {
  const { expenseId } = req.params;
  const { title } = req.body;

  const foundExpense = getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!title) {
    res.sendStatus(400);

    return;
  }

  try {
    updateExpense(foundExpense, title);
  } catch (_) {
    req.sendStatus(409);
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

module.exports = {
  controllerPostExpense,
  controllerGetExpenses,
  controllerGetExpenseById,
  controllerDeleteExpense,
  controllerPatchExpense,
};
