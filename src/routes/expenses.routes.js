'use strict';

const express = require('express');

const expenseConrollers = require('../controllers/expenses.controllers');

const expensesRouter = express.Router();

expensesRouter.get('/', expenseConrollers.getExpenses);

expensesRouter.get('/:id', expenseConrollers.getExpenseById);

expensesRouter.post('/', expenseConrollers.addExpense);

expensesRouter.delete('/:id', expenseConrollers.deleteExpense);

expensesRouter.patch('/:id', expenseConrollers.updateExpense);

module.exports = {
  expensesRouter,
};
