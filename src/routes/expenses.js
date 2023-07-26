'use strict';

const express = require('express');
const {
  getAllExpenses,
  getOneExpense,
  addExpense,
  removeExpense,
  updateExpense,
} = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/', getAllExpenses);
expensesRouter.get('/:expenseId', getOneExpense);
expensesRouter.post('/', addExpense);
expensesRouter.delete('/:expenseId', removeExpense);
expensesRouter.patch('/:expenseId', updateExpense);

module.exports = {
  expensesRouter,
};
