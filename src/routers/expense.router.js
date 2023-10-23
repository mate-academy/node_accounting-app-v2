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

expensesRouter.get('/:id', getExpenseById);

expensesRouter.post('/', createExpense);

expensesRouter.delete('/:id', removeExpense);

expensesRouter.patch('/:id', updateExpense);

module.exports = expensesRouter;
