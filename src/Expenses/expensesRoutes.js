'use strict';

const express = require('express');
const expensesControllers = require('./expensesControllers');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesControllers.getAllExpenses);
expensesRouter.post('/', expensesControllers.addExpense);
expensesRouter.get('/:expenseId', expensesControllers.getOneExpense);
expensesRouter.delete('/:expenseId', expensesControllers.deleteExpense);
expensesRouter.patch('/:expenseId', expensesControllers.updateExpense);

module.exports = {
  expensesRouter,
};
