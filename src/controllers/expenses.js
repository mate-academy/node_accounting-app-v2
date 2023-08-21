'use strict';

const expensesService = require('../services/expenses.js');

function getExpenses(req, res) {
  const expenses = expensesService.getExpenses();

  res.send(expenses);
};

function getExpense(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(404);

    return;
  }

  const foundExpense = expensesService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

function createExpense(req, res) {
  
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
}
