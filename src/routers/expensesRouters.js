'use strict';

const express = require('express');
const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require('../controllers/expensesControllers');
const expensesRouter = express.Router();

expensesRouter.post('/', createExpense);
expensesRouter.get('/', getAllExpenses);
expensesRouter.get('/:id', getExpenseById);
expensesRouter.patch('/:id', updateExpense);
expensesRouter.delete('/:id', deleteExpense);

module.exports = { expensesRouter };
