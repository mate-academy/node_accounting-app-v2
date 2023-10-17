'use strict';

const express = require('express');
const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
} = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', getAllExpenses);

expensesRouter.get('/:expenseId', getExpenseById);

expensesRouter.post('/', createExpense);

expensesRouter.delete('/:expenseId', removeExpense);

expensesRouter.patch('/:expenseId', updateExpense);

module.exports = expensesRouter;
