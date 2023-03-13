'use strict';

const express = require('express');
const expenseControllers = require('./controllers/expenses');
const expensesRouter = express.Router();

expensesRouter.get('/', expenseControllers.getAll);

expensesRouter.get('/:expenseId', expenseControllers.getExpense);

expensesRouter.delete('/:expenseId', expenseControllers.deleteExpense);

expensesRouter.patch(
  '/:expenseId',
  expenseControllers.updateExpense
);

expensesRouter
  .post('/', expenseControllers.addNewExpense);

module.exports = {
  expensesRouter,
};
