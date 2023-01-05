'use strict';

const expensesController = require('../controllers/expenses');
const express = require('express');
const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.get('/:expenseId', expensesController.getExpenseById);
expensesRouter.post('/', expensesController.addNewExpense);
expensesRouter.delete('/:expenseId', expensesController.deleteExpenseById);
expensesRouter.put('/:expenseId', expensesController.updateExpenseById);

module.exports = {
  expensesRouter,
};
