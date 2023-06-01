'use strict';

const express = require('express');

const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpenseById,
  changeExpenseById,
} = require('../controllers/expensesController');

const expensesRouter = express.Router();

expensesRouter.get('/', getAllExpenses);
expensesRouter.get('/:expenseId', getExpenseById);
expensesRouter.post('/', createExpense);
expensesRouter.patch('/:expenseId', changeExpenseById);
expensesRouter.delete('/:expenseId', deleteExpenseById);

module.exports = expensesRouter;
