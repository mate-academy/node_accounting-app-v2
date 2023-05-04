'use strict';

const express = require('express');
const {
  getAllExpensesAction,
  addExpenseAction,
  getExpenseAction,
  deleteExpenseAction,
  updateExpenseAction,
} = require('../controllers/expenses');

const routerExpenses = express.Router();

routerExpenses.get('/', getAllExpensesAction);

routerExpenses.post('/', addExpenseAction);

routerExpenses.get('/:expenseId', getExpenseAction);

routerExpenses.delete('/:expenseId', deleteExpenseAction);

routerExpenses.patch('/:expenseId', updateExpenseAction);

module.exports = routerExpenses;
