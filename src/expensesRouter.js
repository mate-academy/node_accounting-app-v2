'use strict';

const express = require('express');
const expensesRouter = express.Router();
const {
  getExpensesByQuery,
  createNewExpense,
  getExpenseById,
  removeExpense,
  updateExpenseInfo,
} = require('./expensesControllers');

// EXPENSES ROUTES
expensesRouter.get('/', getExpensesByQuery);
expensesRouter.post('/', createNewExpense);
expensesRouter.get('/:id', getExpenseById);
expensesRouter.delete('/:id', removeExpense);
expensesRouter.patch('/:id', updateExpenseInfo);

module.exports = expensesRouter;
