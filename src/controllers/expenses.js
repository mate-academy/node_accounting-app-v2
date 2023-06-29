'use strict';

const usersService = require('../services/users');
const expensesService = require('../services/expenses');

function getExpenses(req, res) {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const filteredExpenses
    = expensesService.getExpenses(userId, category, from, to);

  res.statusCode = 200;
  res.send(filteredExpenses);
}

function getExpenseById(req, res) {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
}

function removeExpense(req, res) {
  const { expenseId } = req.params;

  const foundExpenses = expensesService.getExpenseById(expenseId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(expenseId);
  res.sendStatus(204);
}

function addExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.addExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpense);
}

function updateExpense(req, res) {
  const { expenseId } = req.params;
  const newParams = req.body;

  if (!expenseId || !newParams) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.updateExpense(foundExpense, newParams);

  res.send(foundExpense);
};

module.exports = {
  getExpenses,
  getExpenseById,
  removeExpense,
  addExpense,
  updateExpense,
};
